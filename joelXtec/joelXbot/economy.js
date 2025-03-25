/*import config from '../../config.cjs'; // Import config to get PREFIX

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
*/



import config from '../../config.cjs'; // Import config to get PREFIX

const economyData = {}; // In-memory storage for economy data (userId -> balance and bank)

// Check if the user has an account
const checkUserAccount = (userId) => {
  if (!economyData[userId]) {
    economyData[userId] = { balance: 0, bank: 0 }; // Added bank property for deposits
  }
};

// Utility to send messages
const sendReply = (m, message) => {
  m.reply(message);
};

// Send a cool menu with all available commands
const sendMenu = (m) => {
  const menu = `
    *🎮 Economy Bot Menu* 🎮

    💰 *Balance Commands*
    - ${config.PREFIX}balance: Check your current balance.
    
    🛠️ *Work and Earn Commands*
    - ${config.PREFIX}work: Work and earn random money.
    - ${config.PREFIX}earn <amount>: Earn a specific amount.
    
    💸 *Spend and Transfer Commands*
    - ${config.PREFIX}spend <amount>: Spend money from your balance.
    - ${config.PREFIX}gift <userId> <amount>: Gift money to another user.
    - ${config.PREFIX}transfer <userId> <amount>: Transfer money to another user.

    🏦 *Banking Commands*
    - ${config.PREFIX}deposit <amount>: Deposit money into your bank.
    - ${config.PREFIX}withdraw <amount>: Withdraw money from your bank.

    ⚙️ *Other Commands*
    - ${config.PREFIX}economy: Show this help menu.
    
    *Note:* Use the commands with the prefix *${config.PREFIX}*.
  `;
  sendReply(m, menu); // Send the structured menu to the user
};

// Command handler
const economy = async (m, gss) => {
  if (!m.isGroup) {
    return; // If not from a group, do nothing
  }

  const prefix = config.PREFIX;  // Get prefix from config
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (!cmd) {
    return sendReply(m, `Please use a valid command. For example, ${prefix}balance, ${prefix}earn <amount>, ${prefix}spend <amount>, ${prefix}work, ${prefix}gift <userId> <amount>, ${prefix}transfer <userId> <amount>, ${prefix}deposit <amount>, ${prefix}withdraw <amount>.`);
  }

  // Handle specific commands
  if (cmd === 'balance') {
    checkBalance(m);
  } else if (cmd === 'earn' && text) {
    const amount = parseInt(text);
    if (isNaN(amount) || amount <= 0) {
      return sendReply(m, "Please provide a valid positive amount to earn.");
    }
    earnMoney(m, amount);
  } else if (cmd === 'spend' && text) {
    const amount = parseInt(text);
    if (isNaN(amount) || amount <= 0) {
      return sendReply(m, "Please provide a valid positive amount to spend.");
    }
    spendMoney(m, amount);
  } else if (cmd === 'work') {
    work(m);
  } else if (cmd === 'gift' && text) {
    const [recipientId, amount] = text.split(' ');
    if (!recipientId || isNaN(amount) || amount <= 0) {
      return sendReply(m, "Please provide a valid userId and positive amount to gift.");
    }
    giftMoney(m, recipientId, parseInt(amount));
  } else if (cmd === 'transfer' && text) {
    const [recipientId, amount] = text.split(' ');
    if (!recipientId || isNaN(amount) || amount <= 0) {
      return sendReply(m, "Please provide a valid userId and positive amount to transfer.");
    }
    transferMoney(m, recipientId, parseInt(amount));
  } else if (cmd === 'deposit' && text) {
    const amount = parseInt(text);
    if (isNaN(amount) || amount <= 0) {
      return sendReply(m, "Please provide a valid positive amount to deposit.");
    }
    depositMoney(m, amount);
  } else if (cmd === 'withdraw' && text) {
    const amount = parseInt(text);
    if (isNaN(amount) || amount <= 0) {
      return sendReply(m, "Please provide a valid positive amount to withdraw.");
    }
    withdrawMoney(m, amount);
  } else if (cmd === 'economy') {
    sendMenu(m);  // Show the cool menu
  } else {
    return sendReply(m, `Unrecognized command. Use ${prefix}economy for a list of commands.`);
  }
};

export default economy;
