// ttt.js
let games = {};

const startGame = (m, gss) => {
  try {
    const chatId = m.from;
    if (games[chatId]) {
      return m.reply('A game is already ongoing in this chat!');
    }

    games[chatId] = {
      board: [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']],
      players: [m.from],
      turn: 0,
      winner: null
    };

    m.reply('Tic-Tac-Toe game started! Use "X" or "O" to play. Format: "place [row] [col]" (e.g., "place 1 1" for top-left corner).');
  } catch (error) {
    console.error('Error starting game:', error);
    m.reply('An error occurred while starting the game.');
  }
};

const placeMove = (m, gss) => {
  try {
    const chatId = m.from;
    if (!games[chatId]) {
      return m.reply('No game is currently ongoing in this chat. Type "start" to begin a new game.');
    }

    const game = games[chatId];
    const [command, row, col] = m.body.split(' ');

    // Validating the move
    if (command !== 'place' || isNaN(row) || isNaN(col)) {
      return m.reply('Invalid move! Format: "place [row] [col]" (row/col between 1-3)');
    }

    const r = parseInt(row) - 1;
    const c = parseInt(col) - 1;

    if (r < 0 || r > 2 || c < 0 || c > 2) {
      return m.reply('Invalid position! Row and column must be between 1 and 3.');
    }

    if (game.board[r][c] !== ' ') {
      return m.reply('That spot is already taken!');
    }

    // Player's turn
    const currentPlayer = game.players[game.turn % game.players.length];
    game.board[r][c] = game.turn % 2 === 0 ? 'X' : 'O';

    // Check for winner
    if (checkWinner(game.board)) {
      game.winner = currentPlayer;
      gss.sendMessage(chatId, {
        text: `Player ${currentPlayer} wins!\n${renderBoard(game.board)}`
      });
      delete games[chatId];
      return;
    }

    // Check for draw
    if (game.turn === 8) {
      gss.sendMessage(chatId, {
        text: `It's a draw!\n${renderBoard(game.board)}`
      });
      delete games[chatId];
      return;
    }

    game.turn++;
    gss.sendMessage(chatId, {
      text: `Turn ${game.turn % 2 === 0 ? 'X' : 'O'}.\n${renderBoard(game.board)}`
    });
  } catch (error) {
    console.error('Error placing move:', error);
    m.reply('An error occurred while placing your move.');
  }
};

// Helper function to render the Tic-Tac-Toe board as text
const renderBoard = (board) => {
  return board.map(row => row.join(' | ')).join('\n---------\n');
};

// Check if there's a winner
const checkWinner = (board) => {
  // Check rows, columns, and diagonals
  for (let i = 0; i < 3; i++) {
    if (board[i][0] !== ' ' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return true;
    if (board[0][i] !== ' ' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) return true;
  }

  // Check diagonals
  if (board[0][0] !== ' ' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return true;
  if (board[0][2] !== ' ' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return true;

  return false;
};

export { startGame, placeMove };
