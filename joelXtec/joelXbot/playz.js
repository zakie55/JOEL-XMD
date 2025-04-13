import axios from "axios";
import yts from "yt-search";
import config from '../../config.cjs';

const play2 = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";
  const args = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "play4") {
    if (!args) {
      return m.reply("❌ Please provide a song name or YouTube link.\n\nExample:\n.play2 Moye Moye\n.play2 https://youtu.be/xyz");
    }

    try {
      m.reply("🔍 Searching and processing your song request...");

      let videoUrl, title;

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
      }

      // Request audio from the API
      const apiUrl = `https://home.lazacktech.biz.id/api/ytdl?url=${encodeURIComponent(videoUrl)}`;
      const { data } = await axios.get(apiUrl, { timeout: 20000 });

      if (!data.success || !data.result?.download_link) {
        return m.reply("❌ Failed to download the song. Please try again later.");
      }

      // Send back the audio
      await gss.sendMessage(
        m.from,
        { 
          audio: { url: data.result.download_link },
          mimetype: 'audio/mpeg',
          fileName: `${title}.mp3`,
          ptt: false
        },
        { quoted: m }
      );

      m.reply(`✅ Sent: *${title}*`);

    } catch (error) {
      console.error("play2 error:", error.message);
      m.reply("❌ An unexpected error occurred. Please try again.\n\n" + error.message);
    }
  }
};

export default play2;
