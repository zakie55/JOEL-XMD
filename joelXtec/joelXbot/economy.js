import config from '../../config.cjs'; // Import config to get PREFIX

const economyData = {}; // In-memory storage for economy data (userId -> balance)

const checkUserAccount = (userId) => {
  if (!economyData[userId]) {
    economyData[userId] = { balance: 0 };
  }
};

// Utility to send messages
const sendReply = (m, message) => {
  m.reply(message);
};

// Command to check balance
const checkBalance = (m) => {
  const userId = m.sender;
  checkUserAccount(userId); // Ensure the user has an account
  sendReply(m, `Your current balance is $${economyData[userId].balance}.`);
};

// Command to earn money (e.g., daily reward, work)
const earnMoney = (m, amount) => {
  const userId = m.sender;
  checkUserAccount(userId); // Ensure the user has an account

  if (amount <= 0) {
    return sendReply(m, "Please provide a valid positive amount.");
  }

  economyData[userId].balance += amount;
  sendReply(m, `You earned $${amount}. Your new balance is $${economyData[userId].balance}.`);
};

// Command to spend money
const spendMoney = (m, amount) => {
  const userId = m.sender;
  checkUserAccount(userId); // Ensure the user has an account

  if (economyData[userId].balance < amount) {
    return sendReply(m, `You do not have enough money. Your balance is $${economyData[userId].balance}.`);
  }

  if (amount <= 0) {
    return sendReply(m, "Please provide a valid positive amount to spend.");
  }

  economyData[userId].balance -= amount;
  sendReply(m, `You spent $${amount}. Your new balance is $${economyData[userId].balance}.`);
};

// Command handler
const economy = async (m, gss) => {
  // Check if the message is from a group
  if (!m.isGroup) {
    return; // If not from a group, do nothing
  }

  const prefix = config.PREFIX;  // Get prefix from config
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === 'balance') {
    checkBalance(m);
  } else if (cmd === 'earn' && text) {
    const amount = parseInt(text);
    if (isNaN(amount) || amount <= 0) {
      return sendReply(m, "Please provide a valid positive amount.");
    }
    earnMoney(m, amount);
  } else if (cmd === 'spend' && text) {
    const amount = parseInt(text);
    if (isNaN(amount) || amount <= 0) {
      return sendReply(m, "Please provide a valid positive amount.");
    }
    spendMoney(m, amount);
  }
  // Do nothing if the command is invalid or not recognized
};

export default economy;
