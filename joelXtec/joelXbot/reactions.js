import config from '../../config.cjs';

const generateReactionCommand = async (reactionName, reactionEmoji, m, sock) => {
  const prefix = config.PREFIX;
  const pushName = m.pushName || 'User';

  // Extract the command name
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
          renderLargerThumbnail: false,
        },
      },
    };

    await sock.sendMessage(m.from, messagePayload, { quoted: m });
  };

  // Define the reaction command list
  const reactionNames = [
    "bully", "cuddle", "cry", "hug", "awoo", "kiss", "lick", "pat", "smug", "bonk",
    "yeet", "blush", "smile", "wave", "highfive", "handhold", "nom", "bite", "glomp", 
    "slap", "kill", "kick", "happy", "wink", "poke", "dance", "cringe"
  ];

  if (reactionNames.includes(cmd)) {
    try {
      // React to indicate processing
      await sock.sendMessage(m.from, { react: { text: "⏳", key: m.key } });

      const reactionUrl = `https://api.waifu.pics/sfw/${cmd}`;
      const reactionEmojiForCmd = reactionEmoji || '👋'; // Default emoji if not provided

      // Get the reply author (auteurMsgRepondu is expected to be set somewhere)
      const auteurMessage = m.pushName || 'User';
      const auteurMsgRepondu = m.reply ? m.reply.pushName || 'User' : 'User'; // Modify based on your reply structure

      // Create the caption dynamically
      const caption = `@${auteurMessage.split("@")[0]} ${reactionName} @${auteurMsgRepondu.split("@")[0]}`;

      // Send the video with the corresponding caption
      const messagePayload = {
        video: { url: reactionUrl },
        caption: caption,
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
            renderLargerThumbnail: false,
          },
        },
      };

      // Send the reaction video
      await sock.sendMessage(m.from, messagePayload, { quoted: m });

      // React to indicate success
      await sock.sendMessage(m.from, { react: { text: "✅", key: m.key } });
    } catch (error) {
      console.error(error);
      await sendCommandMessage("⚠️ An error occurred while processing the reaction. Please try again later!");
    }
  }
};

const wallpaperCmd = async (m, sock) => {
  const prefix = config.PREFIX;
  const pushName = m.pushName || 'User';

  // Extract the command name
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';

  // Call the generateReactionCommand function for reactions
  if (["bully", "cuddle", "cry", "hug", "awoo", "kiss", "lick", "pat", "smug", "bonk", 
       "yeet", "blush", "smile", "wave", "highfive", "handhold", "nom", "bite", "glomp", 
       "slap", "kill", "kick", "happy", "wink", "poke", "dance", "cringe"].includes(cmd)) {
    await generateReactionCommand(cmd, '👋', m, sock);
  }
};

export default wallpaperCmd;
