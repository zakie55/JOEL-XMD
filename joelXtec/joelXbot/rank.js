/*import fs from 'fs';
import moment from 'moment-timezone';
import config from '../../config.cjs';

const rank = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';

  if (cmd === "rank") {
    await m.React('💭'); // React with a thinking icon
    
    // Sample data: You can replace this with your actual leaderboard data
    const leaderboard = [
      { name: "User1", points: 1000 },
      { name: "User2", points: 900 },
      { name: "User3", points: 800 },
      { name: "User4", points: 700 },
      { name: "User5", points: 600 },
    ];

    // Sort the leaderboard by points (descending)
    leaderboard.sort((a, b) => b.points - a.points);

    // Find the rank of the user who sent the command
    const userRank = leaderboard.findIndex(user => user.name === m.pushName) + 1;
    const userPoints = leaderboard[userRank - 1] ? leaderboard[userRank - 1].points : 0;

    let rankMessage = `👑 *Rank Information*\n\n`;
    rankMessage += `*Your Rank*: ${userRank} / ${leaderboard.length}\n`;
    rankMessage += `*Your Points*: ${userPoints}\n\n`;

    rankMessage += `╭──❍ 「 *Leaderboard* 」❍\n`;

    // Display top 5 users (or all, if you prefer)
    leaderboard.slice(0, 5).forEach((user, index) => {
      rankMessage += `│ ${index + 1}. ${user.name} - ${user.points} points\n`;
    });

    rankMessage += `╰─────────────────❍`;

    await m.React('✔️'); // React with a success icon

    // Send the rank message
    sock.sendMessage(
      m.from,
      {
        text: rankMessage,
        contextInfo: {
          isForwarded: true,
        },
      },
      { quoted: m }
    );
  }
};

export default rank;
*/
import fs from 'fs';
import moment from 'moment-timezone';
import config from '../../config.cjs';

// Path to store leaderboard data
const leaderboardFile = './leaderboard.json';

// Function to get leaderboard data
const getLeaderboard = () => {
  if (fs.existsSync(leaderboardFile)) {
    const data = fs.readFileSync(leaderboardFile, 'utf8');
    return JSON.parse(data);
  }
  return [];
};

// Function to save leaderboard data
const saveLeaderboard = (leaderboard) => {
  fs.writeFileSync(leaderboardFile, JSON.stringify(leaderboard, null, 2), 'utf8');
};

// Function to get rank card based on points
const getRankCard = (points) => {
  if (points >= 1000) {
    return '👑 Gold Rank';
  } else if (points >= 500) {
    return '🏅 Silver Rank';
  } else if (points >= 100) {
    return '🥉 Bronze Rank';
  }
  return '📝 Newbie Rank'; // Default rank if points are very low
};

const rank = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';

  if (cmd === "rank") {
    await m.React('💭'); // React with a thinking icon

    // Get the current leaderboard
    let leaderboard = getLeaderboard();

    // Check if the user exists in the leaderboard
    const userIndex = leaderboard.findIndex(user => user.name === m.pushName);
    if (userIndex === -1) {
      leaderboard.push({ name: m.pushName, points: 0 });
    }

    // Update the user's points (adding 10 points for every message sent)
    leaderboard[userIndex === -1 ? leaderboard.length - 1 : userIndex].points += 10;

    // Sort the leaderboard by points (descending)
    leaderboard.sort((a, b) => b.points - a.points);

    // Find the rank of the user who sent the command
    const userRank = leaderboard.findIndex(user => user.name === m.pushName) + 1;
    const userPoints = leaderboard[userRank - 1] ? leaderboard[userRank - 1].points : 0;
    const userRankCard = getRankCard(userPoints); // Get rank card based on points

    // Prepare the rank message
    let rankMessage = `👑 *Rank Information*\n\n`;
    rankMessage += `*Your Rank*: ${userRank} / ${leaderboard.length}\n`;
    rankMessage += `*Your Points*: ${userPoints}\n`;
    rankMessage += `*Your Rank Card*: ${userRankCard}\n\n`;

    rankMessage += `╭──❍ 「 *Leaderboard* 」❍\n`;

    // Display top 5 users with their rank cards
    leaderboard.slice(0, 5).forEach((user, index) => {
      const rankCard = getRankCard(user.points); // Get rank card for each user
      rankMessage += `│ ${index + 1}. ${user.name} - ${user.points} points - ${rankCard}\n`;
    });

    rankMessage += `╰─────────────────❍`;

    // Save the updated leaderboard
    saveLeaderboard(leaderboard);

    await m.React('✔️'); // React with a success icon

    // Send the rank message
    sock.sendMessage(
      m.from,
      {
        text: rankMessage,
        contextInfo: {
          isForwarded: true,
        },
      },
      { quoted: m }
    );
  }
};

// Function to handle updating points for every message
const messageHandler = async (m, sock) => {
  let leaderboard = getLeaderboard();

  const userIndex = leaderboard.findIndex(user => user.name === m.pushName);
  if (userIndex === -1) {
    leaderboard.push({ name: m.pushName, points: 0 });
  }

  // Add points for every message (10 points)
  leaderboard[userIndex === -1 ? leaderboard.length - 1 : userIndex].points += 10;

  // Sort the leaderboard by points (descending)
  leaderboard.sort((a, b) => b.points - a.points);

  // Save the updated leaderboard
  saveLeaderboard(leaderboard);

  await m.React('💬'); // React to the message with an icon
};

export { rank, messageHandler };
