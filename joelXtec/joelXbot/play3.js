import axios from 'axios';
import config from '../../config.cjs';

const sendMedia = async (m, sock, mediaType, mediaUrl, mimeType, caption, thumbnail) => {
  try {
    const mediaMessage = mediaType === 'audio'
      ? { audio: { url: mediaUrl }, mimetype: mimeType, caption, thumbnail }
      : { video: { url: mediaUrl }, mimetype: mimeType, caption, thumbnail };

    await sock.sendMessage(m.from, mediaMessage, { quoted: m });
    await m.React(mediaType === 'audio' ? '🎵' : '🎬');
  } catch (error) {
    console.error(`Error sending ${mediaType}:`, error);
    await sock.sendMessage(m.from, { text: `❌ Failed to send ${mediaType}!` }, { quoted: m });
  }
};

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

    if (cmd === "mix") {
      if (!text) {
        await sock.sendMessage(m.from, { text: "🔎 Please provide a song name or artist!" }, { quoted: m });
        await m.React('❌');
        return;
      }

      await m.React('⏳');

      try {
        const apiUrl = `https://apis.davidcyriltech.my.id/play?query=${encodeURIComponent(text)}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data?.status || !data?.result) {
          await sock.sendMessage(m.from, { text: "❌ No results found!" }, { quoted: m });
          await m.React('❌');
          return;
        }

        const { title = 'Unknown', download_url, thumbnail, duration = '0:00' } = data.result;

        // Check if media data is available
        if (!download_url || !thumbnail) {
          await sock.sendMessage(m.from, { text: "❌ Invalid media data!" }, { quoted: m });
          await m.React('❌');
          return;
        }

        // Send menu with media info and selection options
        const menuMessage = `🎵 *Media Information*\n\n` +
          `*Title*: ${title}\n` +
          `*Duration*: ${duration}\n\n` +
          `Please choose an option:\n` +
          `1. Send as Audio\n` +
          `2. Send as Video`;

        await sock.sendMessage(m.from, { text: menuMessage }, { quoted: m });

        // Wait for the user's response (for audio or video)
        const userResponse = await sock.waitForMessage(m.from, { waitTime: 30000 }); // wait for 30 seconds

        if (!userResponse) {
          await sock.sendMessage(m.from, { text: "⏳ You took too long to respond. Please try again!" }, { quoted: m });
          return;
        }

        const userChoice = userResponse.body.trim();

        // Handle the user's choice
        if (userChoice === '1') {
          // Send audio
          await sendMedia(m, sock, 'audio', download_url, "audio/mpeg", `🎵 *${title}*\n⏱ ${duration}`, thumbnail);
        } else if (userChoice === '2') {
          // Send video
          await sendMedia(m, sock, 'video', download_url, "video/mp4", `🎬 *${title}*\n⏱ ${duration}`, thumbnail);
        } else {
          await sock.sendMessage(m.from, { text: "❌ Invalid choice. Please reply with '1' for audio or '2' for video." }, { quoted: m });
        }

      } catch (error) {
        console.error("Error in play command:", error);
        await sock.sendMessage(m.from, { text: "❌ Failed to process your request!" }, { quoted: m });
        await m.React('❌');
      }
    }
  } catch (error) {
    console.error('Critical error in playHandler:', error);
  }
};

export default playHandler;
