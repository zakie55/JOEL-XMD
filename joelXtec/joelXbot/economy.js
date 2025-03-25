import { Low, JSONFile } from 'lowdb';  // Lowdb is a small local JSON database
import { nanoid } from 'nanoid';

// Set up Lowdb
const db = new Low(new JSONFile('db.json'));
await db.read();

// Default database structure
db.data ||= { users: [] };

// Function to check balance
const checkBalance = async (userId) => {
  const user = db.data.users.find(u => u.id === userId);
  if (!user) return 'You have no balance.';

  return `Your balance is: $${user.balance}`;
};

// Function to give money to a user
const giveMoney = async (userId, amount) => {
  let user = db.data.users.find(u => u.id === userId);

  if (!user) {
    // If the user doesn't exist, create them with a starting balance
    user = { id: userId, balance: 0 };
    db.data.users.push(user);
  }

  user.balance += amount;
  await db.write();

  return `You have received $${amount}. Your new balance is $${user.balance}.`;
};

// Function to subtract money from a user
const subtractMoney = async (userId, amount) => {
  const user = db.data.users.find(u => u.id === userId);

  if (!user || user.balance < amount) {
    return 'You don’t have enough balance to perform this action.';
  }

  user.balance -= amount;
  await db.write();

  return `You have spent $${amount}. Your new balance is $${user.balance}.`;
};

// Function to create a new user (e.g., for a first-time user)
const createUser = async (userId) => {
  const userExists = db.data.users.find(u => u.id === userId);

  if (userExists) return 'User already exists!';

  const newUser = {
    id: userId,
    balance: 0,  // Set starting balance to 0
    username: nanoid(8),  // Random username using nanoid
  };

  db.data.users.push(newUser);
  await db.write();

  return `Welcome! Your account has been created with username: ${newUser.username}.`;
};

// Function to handle betting
const bet = async (userId, betAmount) => {
  const user = db.data.users.find(u => u.id === userId);

  // Check if user exists and has enough balance
  if (!user) return 'You need to create an account first.';
  if (user.balance < betAmount) return 'You do not have enough balance to place this bet.';

  // Simulate a simple bet outcome (50/50 chance)
  const outcome = Math.random() < 0.5;  // 50% chance of winning

  // If they win, double their bet; if they lose, subtract the bet amount
  if (outcome) {
    user.balance += betAmount;
    await db.write();
    return `Congratulations! You won the bet and now have $${user.balance}.`;
  } else {
    user.balance -= betAmount;
    await db.write();
    return `Sorry, you lost the bet. Your new balance is $${user.balance}.`;
  }
};

// Function to handle commands
const handleCommand = async (command, args, userId) => {
  if (command === 'balance') {
    return await checkBalance(userId);
  } else if (command === 'give') {
    const amount = parseInt(args[0], 10);
    if (isNaN(amount)) return 'Please provide a valid amount to give.';
    return await giveMoney(userId, amount);
  } else if (command === 'spend') {
    const amount = parseInt(args[0], 10);
    if (isNaN(amount)) return 'Please provide a valid amount to spend.';
    return await subtractMoney(userId, amount);
  } else if (command === 'create') {
    return await createUser(userId);
  } else if (command === 'bet') {
    const betAmount = parseInt(args[0], 10);
    if (isNaN(betAmount)) return 'Please provide a valid bet amount.';
    return await bet(userId, betAmount);
  } else {
    return 'Unknown command.';
  }
};

// Export functions for use in bot commands
export { handleCommand, checkBalance, giveMoney, subtractMoney, createUser, bet };
