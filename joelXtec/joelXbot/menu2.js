/*
import config from '../../config.cjs';

const LogoCmd = async (m, sock) => {
  const prefix = config.PREFIX;
  const pushName = m.pushName || 'User';

  // Extract the command name (should only be "logo13")
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
          newsletterJid: '120363315182578784@newsletter',
          newsletterName: "Sarkar-MD",
          serverMessageId: -1,
        },
        externalAdReply: {
          title: "✨ Sarkar-MD ✨",
          body: pushName,
          thumbnailUrl:
            'https://raw.githubusercontent.com/Sarkar-Bandaheali/BALOCH-MD_DATABASE/refs/heads/main/Pairing/1733805817658.webp',
          sourceUrl: 'https://github.com/Sarkar-Bandaheali/Sarkar-MD',
          mediaType: 1,
          renderLargerThumbnail: false,
        },
      },
    };

    await sock.sendMessage(m.from, messagePayload, { quoted: m });
  };

  // Handle the "logo13" command
  if (cmd === "menu2") {
    // Use the fixed text "joel xmd"
    const text = "joel xmd";

    try {
      // React to the user that processing has started
      await sock.sendMessage(m.from, { react: { text: "⏳", key: m.key } });

      // The logo URL is static
      const logoUrl = 'https://raw.githubusercontent.com/Sarkar-Bandaheali/BALOCH-MD_DATABASE/refs/heads/main/Pairing/1733805817658.webp';
      const caption = `Here is your logo for ${text}\n> POWERED BY BANDAHEALI && SHOBAN`;

      // Create a message payload with the image and caption
      const messagePayload = {
        image: { url: logoUrl },
        caption: caption,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363315182578784@newsletter',
            newsletterName: "Sarkar-MD",
            serverMessageId: -1,
          },
          externalAdReply: {
            title: "✨ Sarkar-MD ✨",
            body: pushName,
            thumbnailUrl:
              'https://raw.githubusercontent.com/Sarkar-Bandaheali/BALOCH-MD_DATABASE/refs/heads/main/Pairing/1733805817658.webp',
            sourceUrl: 'https://github.com/Sarkar-Bandaheali/Sarkar-MD',
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        },
      };

      // Send the image message
      await sock.sendMessage(m.from, messagePayload, { quoted: m });
      // React to indicate success
      await sock.sendMessage(m.from, { react: { text: "✅", key: m.key } });
    } catch (error) {
      console.error(error);
      await sendCommandMessage("⚠️ An error occurred while sending the logo. Please try again later!");
    }
  }
};

export default LogoCmd;
*/
import config from '../../config.cjs';

const LogoCmd = async (m, sock) => {
  const prefix = config.PREFIX;
  const pushName = m.pushName || 'User';

  // Extract the command name (should only be "logo13")
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

  // Handle the "logo13" command
  if (cmd === "menu2") {
    // Use the fixed text "joel xmd"
    const text = "joel xmd";

    try {
      // React to the user that processing has started
      await sock.sendMessage(m.from, { react: { text: "⏳", key: m.key } });

      // The logo URL is static
      const logoUrl = 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/joelXbot.jpg';
      const caption = `welcome to joel xmd bot `;

      // Create a message payload with the image and caption
      const messagePayload = {
        image: { url: logoUrl },
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

      // Send the image message
      await sock.sendMessage(m.from, messagePayload, { quoted: m });
      // React to indicate success
      await sock.sendMessage(m.from, { react: { text: "✅", key: m.key } });
    } catch (error) {
      console.error(error);
      await sendCommandMessage("⚠️ An error occurred while sending the menu. Please try again later!");
    }
  }
};

export default LogoCmd;




