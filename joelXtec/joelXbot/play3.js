import axios from "axios";
import yts from "yt-search";
import config from '../config.cjs';

const play2 = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";
  const args = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "play2") {
    if (!args) return m.reply("Please provide a YouTube link or song name\nExample: .play2 Moye Moye\nOr: .play2 https://youtu.be/xyz");

    try {
      m.reply("🔍 Processing your request... Please wait while we find the best match.");

      let videoUrl;
      
      // Check if input is a YouTube URL
      if (args.match(/(youtube\.com|youtu\.be)/)) {
        videoUrl = args;
      } else {
        // Search YouTube if input is text
        const searchResults = await yts(args);
        if (!searchResults.videos.length) return m.reply("❌ No results found");
        videoUrl = searchResults.videos[0].url;
      }

      const apiUrl = `https://apis.davidcyriltech.my.id/play?query=${encodeURIComponent(videoUrl)}`;
      const { data } = await axios.get(apiUrl);

      // Check if the API returned a valid download URL
      if (!data || !data.download || !data.download.url) {
        return m.reply("❌ Failed to find a valid audio URL. Please try again later.");
      }

      const audioUrl = data.download.url; // Get the audio URL

      await gss.sendMessage(
        m.from,
        { 
          audio: { url: audioUrl },
          mimetype: 'audio/mpeg'
        },
        { quoted: m }
      );

    } catch (error) {
      console.error(error);
      m.reply(`❌ An error occurred: ${error.message}. Please try again later.`);
    }
  }
};

export default play2;
