const axios = require('axios');

let antibadEnabled = false;
let badWords = new Set();

const fetchBadWords = async () => {
  try {
    const response = await axios.get('https://api.example.com/bad-words'); // Replace with a valid endpoint
    badWords = new Set(response.data.words); // Assuming the API returns an array of bad words
    console.log('Bad words list fetched successfully!');
  } catch (error) {
    console.error('Error fetching bad words:', error);
  }
};

const AntibadCmd = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);  // Bot's number
  const ownerNumber = config.OWNER_NUMBER + '@s.whatsapp.net'; // Owner's number from the config
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).trim() : ''; // Extract command and arguments

  // Check if the sender is either the bot or the owner
  const isOwnerOrBot = m.sender === ownerNumber || m.sender === botNumber;

  // Only allow the owner or bot to use this command
  if (!isOwnerOrBot) {
    return m.reply('❌ *Only the owner or the bot itself can use this command!*');
  }

  // Command to enable/disable antibad filter
  if (cmd.toLowerCase() === 'antibad on') {
    antibadEnabled = true;
    m.reply('✅ *Antibad filter is now ENABLED.*');
  } else if (cmd.toLowerCase() === 'antibad off') {
    antibadEnabled = false;
    m.reply('✅ *Antibad filter is now DISABLED.*');
  } else if (cmd.toLowerCase() === 'antibad') {
    const message = m.body.slice(prefix.length + 7).trim();  // Get the message after the command

    if (message) {
      if (antibadEnabled) {
        // Split the message into words and check if any word is in the badWords set
        const containsBadWord = message.split(/\s+/).some(word => badWords.has(word.toLowerCase()));

        if (containsBadWord) {
          m.reply('❌ *Your message contains inappropriate content and has been blocked.*');
        } else {
          m.reply('✅ *Your message is clean and contains no bad words.*');
        }
      } else {
        m.reply('🔄 *Antibad filter is disabled. No checks are being performed.*');
      }
    } else {
      m.reply('❌ *Please provide a message to check for bad words.*');
    }
  } else {
    m.reply('❌ *Invalid command. Please use the format: antibad on | antibad off | antibad <message>*');
  }
};

// Fetch bad words list at startup
fetchBadWords();

export default AntibadCmd;
