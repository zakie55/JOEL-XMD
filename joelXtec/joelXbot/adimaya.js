import config from '../../config.cjs';
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
