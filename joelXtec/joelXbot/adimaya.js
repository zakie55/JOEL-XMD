/*import config from '../../config.cjs';
import process from 'process';

const RestartCmd = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const ownerNumber = config.OWNER_NUMBER + '@s.whatsapp.net';
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const isOwner = m.sender === ownerNumber;

  if (cmd === 'restart') {
    if (!isOwner) return m.reply('❌ *Only the owner can use this command!*');

    try {
      m.reply('🔄 *Bot is restarting...*');
      // Exit the current process, the bot will be restarted by PM2 or another process manager
      process.exit(1);
    } catch (e) {
      console.error("Error in restart command:", e);
      m.reply('❌ *Failed to restart the bot!*');
    }
  }
};

export default RestartCmd;
*/
import config from '../../config.cjs';

const AntiDeleteCmd = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const ownerNumber = config.OWNER_NUMBER + '@s.whatsapp.net';
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const isOwner = m.sender === ownerNumber;
  const isBot = m.sender === botNumber;
  const isGroup = m.isGroup;
  const isAdmins = m.isAdmins || isOwner; // ✅ Owner hamesha admin hoga
  const isBotAdmins = m.isBotAdmins;

  if (cmd === 'antidlt') {
    if (!isGroup) return m.reply('❌ *This command can only be used in groups!*');
    if (!isAdmins) return m.reply('❌ *Only Admins & Owner can use this command!*');
    
    try {
      // Enable Anti-Delete (tracking deleted messages)
      // Assuming you have a mechanism to track message deletions (e.g., storing the chat state)
      await Matrix.sendMessage(m.chat, {
        text: '✅ *Anti-Delete is now enabled! I will notify when a message is deleted.*',
      });
    } catch (e) {
      console.error('Error enabling Anti-Delete:', e);
      m.reply('❌ *Failed to enable Anti-Delete!*');
    }
  }

  // Monitoring deleted messages
  Matrix.on('message.delete', async (deletedMessage) => {
    const deletedMessageId = deletedMessage.id;
    const deletedSender = deletedMessage.sender;
    
    if (deletedMessage.isGroup) {
      // Send a message notifying the group about the deleted message
      const deletedNotification = `⚠️ *A message was deleted by @${deletedSender.split('@')[0]}.*`;
      
      await Matrix.sendMessage(deletedMessage.chatId, {
        text: deletedNotification,
        mentions: [deletedSender]  // Mention the sender who deleted the message (optional)
      });
    }
  });

};

export default AntiDeleteCmd;
