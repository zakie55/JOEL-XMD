import axios from 'axios';
import config from '../../config.cjs';

const LogoCmd = async (m, sock) => {
  const prefix = config.PREFIX;
  const pushName = m.pushName || 'User';

  // Extract the command name (should be "logo13")
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

  // Handle "logo13" command
  if (cmd === "menu2") {
    // Extract the text after the command; if no text is provided, send the static image
    const text = m.body.slice(prefix.length + cmd.length + 1).trim();

    try {
      if (!text) {
        // No text provided, send the static image
        const imageUrl = "https://i.ibb.co/WcwzzY2/shaban-sobx-md.jpg";
        const caption = `Here is your requested image\n> POWERED BY BANDAHEALI && SHOBAN`;

        const messagePayload = {
          image: { url: imageUrl },
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
      } else {
        // If there is text, send the generated logo (logo13 style)
        const apiUrl = `https://api-pink-venom.vercel.app/api/logo?url=https://en.ephoto360.com/handwritten-text-on-foggy-glass-online-680.html&name=${encodeURIComponent(text)}`;
        const response = await axios.get(apiUrl);
        const result = response.data;

        // Check if the response is successful and contains a download_url
        if (result.status && result.result && result.result.download_url) {
          const logoUrl = result.result.download_url;
          const caption = `Here is your logo for ${text}\n> POWERED BY BANDAHEALI && SHOBAN`;

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
        } else {
          await sendCommandMessage("⚠️ Failed to generate the logo. Please try again later!");
        }
      }
    } catch (error) {
      console.error(error);
      await sendCommandMessage("⚠️ An error occurred while processing your request. Please try again later!");
    }
  }
};

export default LogoCmd;
