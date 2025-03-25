let rpsGames = {}; // To keep track of active Rock, Paper, Scissors games

const rps = async (m, sock) => {
  const prefix = config.PREFIX;
  const pushName = m.pushName || 'User';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  // Command to start a new game
  if (cmd === "rps") {
    if (rpsGames[m.from]) {
      await sock.sendMessage(m.from, { text: 'A Rock, Paper, Scissors game is already in progress! Type *end* to stop it.' });
      return;
    }
    rpsGames[m.from] = {
      players: [m.sender], // Store the first player who started the game
      status: 'waiting', // Waiting for the second player
      choices: {} // Store the players' choices
    };
    await sock.sendMessage(m.from, { text: `Hello *${pushName}*, you've started a Rock, Paper, Scissors game! Please wait for another player to join...` });
  }

  // If the user wants to join an existing game
  if (cmd === "join" && rpsGames[m.from] && rpsGames[m.from].status === 'waiting') {
    rpsGames[m.from].players.push(m.sender);
    rpsGames[m.from].status = 'started';
    await sock.sendMessage(m.from, { text: `Game started! *${pushName}* has joined the game. It's time to make your move: type *rock*, *paper*, or *scissors*.` });
  }

  // Player makes their move
  if (cmd === "rock" || cmd === "paper" || cmd === "scissors") {
    if (!rpsGames[m.from]) {
      await sock.sendMessage(m.from, { text: 'No game found. Start a new game by typing *rps*' });
      return;
    }

    const game = rpsGames[m.from];
    if (game.status === 'waiting') {
      await sock.sendMessage(m.from, { text: 'Wait for another player to join before making a move!' });
      return;
    }

    if (game.choices[m.sender]) {
      await sock.sendMessage(m.from, { text: 'You have already made your move! Wait for the other player to make theirs.' });
      return;
    }

    game.choices[m.sender] = cmd;

    // Check if both players have made their moves
    if (Object.keys(game.choices).length === 2) {
      const [player1, player2] = game.players;
      const player1Choice = game.choices[player1];
      const player2Choice = game.choices[player2];

      const result = getRPSResult(player1Choice, player2Choice);
      let resultMessage = '';

      if (result === 0) {
        resultMessage = `It's a draw! Both players chose ${player1Choice}.`;
      } else if (result === 1) {
        resultMessage = `*${player1}* wins! ${player1Choice} beats ${player2Choice}.`;
      } else {
        resultMessage = `*${player2}* wins! ${player2Choice} beats ${player1Choice}.`;
      }

      await sock.sendMessage(m.from, { text: `Game Over!\n\n${resultMessage}` });
      delete rpsGames[m.from]; // End the game
    } else {
      await sock.sendMessage(m.from, { text: `*${pushName}*, you've made your move! Wait for the other player to make theirs.` });
    }
  }

  // End the game
  if (cmd === "end") {
    if (rpsGames[m.from]) {
      delete rpsGames[m.from]; // Remove the game
      await sock.sendMessage(m.from, { text: 'Game ended.' });
    } else {
      await sock.sendMessage(m.from, { text: 'No game in progress to end.' });
    }
  }
};

// Function to determine the result of the game
// 0 = draw, 1 = player1 wins, -1 = player2 wins
function getRPSResult(player1Choice, player2Choice) {
  if (player1Choice === player2Choice) return 0; // Draw

  if (
    (player1Choice === 'rock' && player2Choice === 'scissors') ||
    (player1Choice === 'scissors' && player2Choice === 'paper') ||
    (player1Choice === 'paper' && player2Choice === 'rock')
  ) {
    return 1; // Player 1 wins
  }

  return -1; // Player 2 wins
}

export default rps;
