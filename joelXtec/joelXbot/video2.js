import axios from "axios";
import yts from "yt-search";
import config from '../../config.cjs';

const play2 = async (m, gss) => {
  const prefix = config.PREFIX;
  const validCommands = ['vdl', 'mp4', 'video', 'v']; // Array of valid commands
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";
  const args = m.body.slice(prefix.length + cmd.length).trim();

  // If the command is invalid, simply return without replying
  if (!validCommands.includes(cmd)) return;

  if (cmd) {
    if (!args) return m.reply("Please provide a YouTube link or song name\nExample: .play Moye Moye\nOr: .play https://youtu.be/xyz");

    try {
      m.reply("🔍 Processing your request...");

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

      const apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;
      
      // Make a request to fetch the download URL
      const { data } = await axios.get(apiUrl);
      
      if (!data.success || !data.result) {
        return m.reply("❌ Failed to download video. Please try again later.");
      }

      // Extract details from the API response
      const title = data.result.title || "Untitled";  
      const duration = data.result.duration || "Unknown";  
      const thumbnail = data.result.thumbnail || "https://default_thumbnail_url.com";

      // Create the message payload
      const messagePayload = {
        video: { url: data.result.downloadUrl },
        mimetype: "video/mp4",
        caption: `*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ*`,
        thumbnail: thumbnail,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363317462952356@newsletter',
            newsletterName: "ᴊᴏᴇʟ xᴍᴅ ᴡᴀ ᴄʜᴀɴɴᴇʟ",
            serverMessageId: -1,
          },
          externalAdReply: {
            title: "ᴊᴏᴇʟ xmᴅ ʙᴏᴛ  ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ",
            body: "ᴘʟᴀʏɪɴɢ ɴᴏᴡ ↻ ◁ II ▷ ↺",
            thumbnailUrl: `https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/joelXbot.jpg`,
            sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      };

      // Send the video message
      await gss.sendMessage(
        m.from,
        messagePayload,
        { quoted: m }
      );

    } catch (error) {
      console.error("Error in video2 function:", error);
      m.reply("❌ An error occurred while processing your request. Please try again.");
    }
  }
};

export default play2;
