import config from '../../config.cjs';

// In-memory user data (for demo purposes)
const wallpaperCmd = async (m, sock) => {
  const prefix = config.PREFIX;
  const pushName = m.pushName || 'User';

  // Extract the command name (should only be "pick")
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';

  // Helper function to send a text message with context info
  const sendCommandMessage = async (messageContent) => {
    const messagePayload = {
      text: messageContent,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363317462952356@newsletter',
          newsletterName: "ᴊᴏᴇʟ xᴅ ʙᴏᴛ",
          serverMessageId: -1,
        },
        externalAdReply: {
          title: "ᴊᴏᴇʟ xᴅ ʙᴏᴛ",
          body: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ",
          thumbnailUrl:
            'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/joelXbot.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    };

    await sock.sendMessage(m.from, messagePayload, { quoted: m });
  };

  // Handle the "pick" command
  if (cmd === "pick") {
    // Extract noun to pick (e.g., "pick a user")
    const noun = m.body.slice(prefix.length + 4).trim();

    if (!noun) {
      await sendCommandMessage("⚠️ Please provide a noun to pick after the command. Example: `pick a user`.");
      return;
    }

    // Check if it's a group message and get all participants
    if (m.isGroup) {
      const participants = await sock.groupMetadata(m.from).then((metadata) => metadata.participants);

      if (participants.length === 0) {
        await sendCommandMessage("⚠️ There are no participants in this group.");
        return;
      }

      // Randomly pick a user from the participants
      const pickedUser = participants[Math.floor(Math.random() * participants.length)];

      // Get the user's name or phone number (in case the name is not available)
      const pickedUserName = pickedUser.pushName || pickedUser.id;

      // Fun response about the picked user
      const message = `
━━━━━━━━━━━━━━━
🎉 **Drumroll...** 🎉
━━━━━━━━━━━━━━━
🏆 The most *${noun}* is... 🏆

🌟 **${pickedUserName}** 🌟

🎯 Congratulations to **${pickedUserName}**! 🎉
━━━━━━━━━━━━━━━
      `;
      await sendCommandMessage(message);
    } else {
      await sendCommandMessage("⚠️ This command only works in a group chat.");
    }
  }
};

export default wallpaperCmd;
