import axios from 'axios';
import config from '../../config.cjs';

const playHandler = async (m, sock) => {
  try {
    // Basic validation
    if (!m?.from || !m?.body || !sock) {
      console.error('Invalid message or socket object');
      return;
    }

    const prefix = config.PREFIX || '!';
    const body = m.body || '';
    
    // Check if message starts with prefix
    if (!body.startsWith(prefix)) return;

    const cmd = body.slice(prefix.length).split(' ')[0].toLowerCase();
    const text = body.slice(prefix.length + cmd.length).trim();

    if (cmd === "play3") {
      if (!text) {
        await sock.sendMessage(m.from, { text: "🎶 Oops! Please provide a song name or artist! 💖" }, { quoted: m });
        await m.React('❌');
        return;
      }

      await m.React('⏳'); // Show loading indicator

      try {
        const apiUrl = `https://apis.davidcyriltech.my.id/play?query=${encodeURIComponent(text)}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data?.status || !data?.result) {
          await sock.sendMessage(m.from, { text: "❌ Uh-oh! No results found for that song! 😔" }, { quoted: m });
          await m.React('❌');
          return;
        }

        const { title = 'Unknown', download_url, thumbnail, duration = '0:00' } = data.result;

        // Create a cute newsletter message payload
        const messagePayload = {
          audio: { url: download_url },
          minetype: "audio/mp3",
          caption: `🎵 *${title}* 🎶\n⏱ *Duration*: ${duration} ⏳\nHope you love it! 💖`,
          thumbnail: thumbnail,
          contextInfo: {
            isForwarded: true,
            forwardingScore: 999,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363317462952356@newsletter',
              newsletterName: "ᴊᴏᴇʟ xᴅ ʙᴏᴛ 💫",
              serverMessageId: -1,
            },
            externalAdReply: {
              title: "ᴊᴏᴇʟ xᴅ ʙᴏᴛ 💖",
              body: "Powered by Lord Joel 🌟",
              thumbnailUrl:
                'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/joelXbot.jpg',
              sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        };

        // Send the cute audio with the newsletter context
        try {
          await sock.sendMessage(m.from, messagePayload, { quoted: m });
          await m.React('🎵'); // Indicate success
        } catch (audioError) {
          console.error("Error sending audio:", audioError);
          await sock.sendMessage(m.from, { text: "❌ Oops! Failed to send the audio! 😓" }, { quoted: m });
        }

      } catch (error) {
        console.error("Error in play command:", error);
        await sock.sendMessage(m.from, { text: "❌ Oh no! Something went wrong! 😢" }, { quoted: m });
        await m.React('❌');
      }
    }
  } catch (error) {
    console.error('Critical error in playHandler:', error);
    await sock.sendMessage(m.from, { text: "❌ Uh-oh! An unexpected error occurred! 😣" }, { quoted: m });
    await m.React('❌');
  }
};

export default playHandler;
