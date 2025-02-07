const { cmd } = require("../command");
const yts = require("yt-search");
const axios = require("axios");

// temporary songs downloader

cmd({
  pattern: "video",
  react: '❑',
  desc: "Download audio from YouTube by searching for keywords (using API 2).",
  category: "music",
  use: ".play <song name or keywords>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) {
      return reply("*Please provide a song name or keywords to search for.*");
    }

    reply("*joel md 🎧 Searching for the song*");

    const searchResults = await yts(searchQuery);
    if (!searchResults.videos || searchResults.videos.length === 0) {
      return reply(`❌ No results found for "${searchQuery}".`);
    }

    const firstResult = searchResults.videos[0];
    const videoUrl = firstResult.url;

    // Call the API to download the audio
    const apiUrl = `https://api.davidcyriltech.my.id/download/ytmp3?url=${videoUrl}`;
    const response = await axios.get(apiUrl);
    if (!response.data.success) {
      return reply(`Failed to fetch audio for "${searchQuery}".`);
    }

    const { title, download_url } = response.data.result;

    // Send the audio file
    await conn.sendMessage(from, {
      audio: { url: download_url },
      mimetype: 'audio/mp4',
      ptt: false
    }, { quoted: mek });

    reply(`*${title}*
╭───────────────━⊷
║ ᴊᴏᴇʟ-xᴍᴅ ᴅᴏᴡɴʟᴏᴀᴅᴇ ᴍᴇɴᴜ
╰───────────────━⊷
╭───────────────━⊷
║💡 *ɴᴀᴍᴇ:* ᴊᴏᴇʟ-xᴍᴅ
║⭐ *ᴛᴏᴛᴀʟ sᴛᴀʀs:* 100
║🍴 *ᴛᴏᴛᴀʟ ғᴏʀᴋs:* 300
║👀 *ᴡᴀᴛᴄʜᴇʀs:* 2
║❗ *ᴏᴘᴇɴ ɪssᴜᴇs:* 2
║👤 *ᴏᴡɴᴇʀ:* ʟᴏʀᴅ ᴊᴏᴇʟ
╰───────────────━⊷
╭───────────────━⊷
║ sᴛᴀʀ ᴛʜᴇɴ ғᴏʀᴋ ᴍʏ ʀᴇᴘᴏ
║ ʀᴇᴘᴏ ʟɪɴᴋ: https://shorturl.at/MV98C
╰───────────────━⊷
 *ᴍᴀᴅᴇ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ*`);
  } catch (error) {
    console.error(error);
    reply("An error occurred while processing your request.");
  }
});
