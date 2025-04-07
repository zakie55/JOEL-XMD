import config from '../../config.cjs';

const wallpaperCmd = async (m, sock) => {
  const prefix = config.PREFIX;
  const pushName = m.pushName || 'User';

  // Extract the command name (could be "anime", "abstract", "sasuke", "random", "bts", "uchicha", or "naruto")
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

  // Handle the "anime" command
  if (cmd === "anime") {
    try {
      await sock.sendMessage(m.from, { react: { text: "⏳", key: m.key } });

      // The wallpaper URL for "anime"
      const wallpaperUrl = 'https://api.nexoracle.com/wallpapers/anime?apikey=33241c3a8402295fdc';
      const caption = `*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ*`;

      const messagePayload = {
        image: { url: wallpaperUrl },
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

      await sock.sendMessage(m.from, messagePayload, { quoted: m });
      await sock.sendMessage(m.from, { react: { text: "✅", key: m.key } });
    } catch (error) {
      console.error(error);
      await sendCommandMessage("⚠️ An error occurred while sending the menu. Please try again later!");
    }
  }

  // Handle the "abstract" command
  if (cmd === "abstract") {
    try {
      await sock.sendMessage(m.from, { react: { text: "⏳", key: m.key } });

      const wallpaperUrl = 'https://api.nexoracle.com/wallpapers/abstract?apikey=33241c3a8402295fdc';
      const caption = `*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ*`;

      const messagePayload = {
        image: { url: wallpaperUrl },
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
            renderLargerThumbnail: true,
          },
        },
      };

      await sock.sendMessage(m.from, messagePayload, { quoted: m });
      await sock.sendMessage(m.from, { react: { text: "✅", key: m.key } });
    } catch (error) {
      console.error(error);
      await sendCommandMessage("⚠️ An error occurred while sending the menu. Please try again later!");
    }
  }

  // Handle the "sasuke" command
  if (cmd === "sasuke") {
    try {
      await sock.sendMessage(m.from, { react: { text: "⏳", key: m.key } });

      const wallpaperUrl = 'https://api.nexoracle.com/wallpapers/anime/sasuke?apikey=33241c3a8402295fdc';
      const caption = `*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ*`;

      const messagePayload = {
        image: { url: wallpaperUrl },
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
            renderLargerThumbnail: true,
          },
        },
      };

      await sock.sendMessage(m.from, messagePayload, { quoted: m });
      await sock.sendMessage(m.from, { react: { text: "✅", key: m.key } });
    } catch (error) {
      console.error(error);
      await sendCommandMessage("⚠️ An error occurred while sending the menu. Please try again later!");
    }
  }

  // Handle the "random" command
  if (cmd === "random") {
    try {
      await sock.sendMessage(m.from, { react: { text: "⏳", key: m.key } });

      const wallpaperUrl = 'https://api.nexoracle.com/wallpapers/random?apikey=33241c3a8402295fdc';
      const caption = `*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ*`;

      const messagePayload = {
        image: { url: wallpaperUrl },
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
            renderLargerThumbnail: true,
          },
        },
      };

      await sock.sendMessage(m.from, messagePayload, { quoted: m });
      await sock.sendMessage(m.from, { react: { text: "✅", key: m.key } });
    } catch (error) {
      console.error(error);
      await sendCommandMessage("⚠️ An error occurred while sending the menu. Please try again later!");
    }
  }

  // Handle the "naruto" command
  if (cmd === "naruto") {
    try {
      await sock.sendMessage(m.from, { react: { text: "⏳", key: m.key } });

      const wallpaperUrl = 'https://api.nexoracle.com/wallpapers/anime/naruto?apikey=33241c3a8402295fdc';
      const caption = `*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ*`;

      const messagePayload = {
        image: { url: wallpaperUrl },
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
            renderLargerThumbnail: true,
          },
        },
      };

      await sock.sendMessage(m.from, messagePayload, { quoted: m });
      await sock.sendMessage(m.from, { react: { text: "✅", key: m.key } });
    } catch (error) {
      console.error(error);
      await sendCommandMessage("⚠️ An error occurred while sending the menu. Please try again later!");
    }
  }
};

export default wallpaperCmd;
