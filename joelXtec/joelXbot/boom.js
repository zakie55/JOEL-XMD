const BoomCmd = async (m, Matrix) => {
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

  // Check if the command starts with 'boom'
  if (cmd.toLowerCase().startsWith('boom')) {
    // Split the command into parts
    const parts = cmd.split(' ');
    
    // Get the number of times to send the message (first argument after 'boom')
    const numTimes = parseInt(parts[1], 10);
    
    // Get the message to send (remaining part after the number)
    const message = parts.slice(2).join(' ');

    // Validate the number
    if (isNaN(numTimes) || numTimes <= 0) {
      return m.reply('❌ *Please provide a valid number greater than 0.*');
    }

    // Validate that there is a message to send
    if (!message) {
      return m.reply('❌ *Please provide a message to send.*');
    }

    // Send the message the specified number of times
    for (let i = 0; i < numTimes; i++) {
      m.reply(message); // Send the message
    }

    // Inform the user that the messages are being sent
    m.reply(`🔊 *Sent your message "${message}" ${numTimes} times!*`);
  } else {
    m.reply('❌ *Invalid command. Please use the format: Boom <number> <message>*');
  }
};
//lord joel 
export default BoomCmd;
