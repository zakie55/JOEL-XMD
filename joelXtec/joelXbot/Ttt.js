import * as random from 'random';

const gameCommands = async (m, sock) => {
  const prefix = config.PREFIX;
  const command = m.body.toLowerCase().trim();

  // Command to start Rock Paper Scissors
  if (command === "rps" || command === "rock paper scissors") {
    await sock.sendMessage(m.from, {
      text: "Choose one: Rock, Paper, or Scissors!"
    });
    
    const userChoice = m.body.toLowerCase();
    const botChoice = random.choice(['rock', 'paper', 'scissors']);
    
    let result = "";
    if (userChoice === botChoice) {
      result = "It's a draw!";
    } else if (
      (userChoice === "rock" && botChoice === "scissors") ||
      (userChoice === "paper" && botChoice === "rock") ||
      (userChoice === "scissors" && botChoice === "paper")
    ) {
      result = "You win!";
    } else {
      result = "You lose!";
    }

    await sock.sendMessage(m.from, {
      text: `You chose ${userChoice}, I chose ${botChoice}. ${result}`
    });
  }

  // Command to start Tic-Tac-Toe
  if (command === "ttt" || command === "tic tac toe") {
    // Initialize the game state
    let board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let currentPlayer = 'X'; // User starts with X
    let gameActive = true;

    // Function to print the board
    const printBoard = () => {
      return `
      ${board[0]} | ${board[1]} | ${board[2]}
      ---------
      ${board[3]} | ${board[4]} | ${board[5]}
      ---------
      ${board[6]} | ${board[7]} | ${board[8]}
      `;
    };

    // Send the initial board
    await sock.sendMessage(m.from, {
      text: `Tic-Tac-Toe Game Started!\n\n${printBoard()}\n\nIt's your turn! Choose a number between 1 and 9 to make your move.`
    });

    // Listen for the user's move
    const filter = (response) => response.from === m.from;
    while (gameActive) {
      const userMoveMessage = await sock.awaitMessage(filter);
      const userMove = parseInt(userMoveMessage.body.trim());

      if (isNaN(userMove) || userMove < 1 || userMove > 9 || board[userMove - 1] === 'X' || board[userMove - 1] === 'O') {
        await sock.sendMessage(m.from, {
          text: "Invalid move! Choose a number between 1 and 9 that hasn't been taken yet."
        });
        continue;
      }

      // Update board with user's move
      board[userMove - 1] = currentPlayer;
      let winner = checkWinner(board);

      // Check if the user won
      if (winner) {
        await sock.sendMessage(m.from, {
          text: `You win!\n\n${printBoard()}`
        });
        gameActive = false;
        break;
      }

      // Check if it's a draw
      if (!board.includes('1') && !board.includes('2') && !board.includes('3') && !board.includes('4') && !board.includes('5') && !board.includes('6') && !board.includes('7') && !board.includes('8') && !board.includes('9')) {
        await sock.sendMessage(m.from, {
          text: `It's a draw!\n\n${printBoard()}`
        });
        gameActive = false;
        break;
      }

      // Switch player to 'O' (bot's turn)
      currentPlayer = 'O';

      // Bot makes a move
      let botMove = random.choice(board.filter(cell => !['X', 'O'].includes(cell)));
      board[board.indexOf(botMove)] = 'O';
      winner = checkWinner(board);

      // Check if bot won
      if (winner) {
        await sock.sendMessage(m.from, {
          text: `I win!\n\n${printBoard()}`
        });
        gameActive = false;
        break;
      }

      // Switch back to user ('X')
      currentPlayer = 'X';

      // Send the updated board after bot's move
      await sock.sendMessage(m.from, {
        text: `I made my move. It's your turn!\n\n${printBoard()}`
      });
    }

    // Function to check the winner
    function checkWinner(board) {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]  // diagonals
      ];

      for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] === board[b] && board[b] === board[c]) {
          return board[a];
        }
      }

      return null;
    }
  }
};

export default gameCommands;
