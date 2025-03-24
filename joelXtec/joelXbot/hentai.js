import config from '../../config.cjs';

// Auto-like Status Command
const AutoLikeStatus = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const ownerNumber = config.OWNER_NUMBER + '@s.whatsapp.net';
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const isOwner = m.sender === ownerNumber;
  const isBot = m.sender === botNumber;
  const isAllowed = isOwner || isBot; // Owner & Bot can use

  // 🤖 Auto Like Status Command (Owner & Bot)
  if (cmd === 'autolike') {
    if (!isAllowed) return m.reply('❌ *You are not authorized to use this command!*');

    try {
      // Assuming there is a way to get the user's current status or last updated status
      const status = await Matrix.getUserStatus(m.sender);  // Assuming Matrix has a method to fetch user status
      if (!status) return m.reply('❌ *Could not retrieve the status.*');

      // Auto-like the status or react to it with the ❤️ emoji
      await Matrix.reactToStatus(m.sender, '❤️');  // Reacting with the heart emoji ❤️

      m.reply('✅ *Successfully liked your status with ❤️!*');
    } catch (error) {
      console.error(error);
      m.reply('❌ *Failed to like the status!*');
    }
  }
};

export default AutoLikeStatus;
