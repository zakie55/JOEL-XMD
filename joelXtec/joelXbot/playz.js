import axios from "axios";
import yts from "yt-search";
import config from '../../config.cjs';

const play2 = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";
  const args = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "play4") {
    if (!args) {
      return m.reply("❌ Please provide a song name or YouTube link.\n\nExample:\n.play4 Moye Moye\n.play4 https://youtu.be/xyz");
    }

    try {
      m.reply("🔍 Searching and processing your song request...");

      let videoUrl, title, thumbnail;

      // If it's a YouTube link
      if (args.match(/(youtube\.com|youtu\.be)/)) {
        videoUrl = args;
        title = "Requested song";
      } else {
        // Search YouTube using the song name
        const searchResults = await yts(args);
        if (!searchResults.videos.length) {
          return m.reply("❌ No results found. Try a different song name.");
        }

        const video = searchResults.videos[0];
        videoUrl = video.url;
        title = video.title;
        thumbnail = video.thumbnail;
      }

      // Request video from the API
      const apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;
      const { data } = await axios.get(apiUrl, { timeout: 20000 });

      if (!data.success || !data.result?.download_url) {
        console.error("API response error:", data);
        return m.reply("❌ Failed to download the song. Please try again later.");
      }

      const download_url = data.result.download_url;
      const image = data.result.image || data.image || 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/joelXbot.jpg';

      // Create a cute newsletter message payload
      const messagePayload = {
        video: { url: download_url },
        mimetype: "video/mp4",
        caption: `*${title}*`,
        thumbnail: image,
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

      // Send the video with newsletter context
      await gss.sendMessage(m.from, messagePayload, { quoted: m });

      m.reply(`✅ Sent: *${title}*`);

    } catch (error) {
      console.error("play2 error:", error.message);
      m.reply("❌ An unexpected error occurred. Please try again.\n\n" + error.message);
    }
  }
};

export default play2;
