import config from '../../config.cjs';

// Auto-like Status Command (Disabled for now)
const AutoLikeStatus = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const ownerNumber = config.OWNER_NUMBER + '@s.whatsapp.net';
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const isOwner = m.sender === ownerNumber;
  const isBot = m.sender === botNumber;
  const isAllowed = isOwner || isBot; // Owner & Bot can use

  // 🤖 Auto Like Status Command (Owner & Bot)
  if (cmd === 'autoslike') {
    const subCmd = m.body.split(' ')[1]; // Get the sub-command (on/off)
    
    // Check if the command is on or off
    if (subCmd === 'on') {
      if (!isAllowed) return m.reply('❌ *You are not authorized to use this command!*');
      isAutoLikeEnabled = true;
      m.reply('✅ *Auto-like has been enabled.*');
    } else if (subCmd === 'off') {
      if (!isAllowed) return m.reply('❌ *You are not authorized to use this command!*');
      isAutoLikeEnabled = false;
      m.reply('✅ *Auto-like has been disabled.*');
    } else {
      return m.reply('❌ *Invalid command. Use "autolike on" to enable or "autolike off" to disable.*');
    }
  }

  // Monitor status updates
  const monitorStatuses = async () => {
    try {
      // Assuming this is the method to listen to status updates.
      // This would need to be replaced with an actual event listener or polling method.
      Matrix.on('status_update', async (status) => {
        if (status) {
          try {
            console.log(`New status posted: ${status}`);

            // React with ❤️ emoji to the new status
            await Matrix.reactToStatus(status.user, '❤️');  // Assuming this method is correct
            console.log(`Auto-liked status from user ${status.user}`);
          } catch (error) {
            console.error('Error auto-liking status:', error);
          }
        }
      });
    } catch (error) {
      console.error('Error monitoring statuses:', error);
    }
  };

  // Start monitoring statuses automatically
  monitorStatuses();

};

export default AutoLikeStatus;
