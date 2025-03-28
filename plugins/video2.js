import _0x533a96 from '../../config.cjs';
import _0x19a145 from 'yt-search';

const video = async (_0x7e52ce, _0x535194) => {
  const PREFIX = _0x533a96.PREFIX;
  const command = _0x7e52ce.body.startsWith(PREFIX) ? _0x7e52ce.body.slice(PREFIX.length).split(" ")[0].toLowerCase() : '';
  const query = _0x7e52ce.body.slice(PREFIX.length + command.length).trim();

  if (command === "video2") {
    if (!query) {
      return _0x7e52ce.reply("❌ *Please provide a search query!*");
    }

    await _0x7e52ce.React('⏳');  // Show loading indicator

    try {
      const searchResults = await _0x19a145(query);
      if (!searchResults.videos.length) {
        return _0x7e52ce.reply("❌ *No results found!*");
      }

      const video = searchResults.videos[0];
      const message = createVideoMessage(video);
      const sentMessage = await _0x535194.sendMessage(_0x7e52ce.from, message, {
        'quoted': _0x7e52ce
      });

      const videoUrl = video.url;
      
      // Automatically choose video (MP4) and send it
      await sendVideoDownload(_0x7e52ce, _0x535194, videoUrl);

    } catch (error) {
      console.error("Error:", error);
      return _0x7e52ce.reply("❌ *An error occurred while processing your request.*");
    }
  }
};

const createVideoMessage = (video) => {
  return {
    image: { url: video.thumbnail },
    caption: `╭─❍ *ᴊᴏᴇʟ xᴍᴅ ᴠ¹⁰ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*` +
      `│ *ᴛɪᴛʟᴇ:* ${video.title}\n` +
      `│ *ᴅᴜʀᴀᴛɪᴏɴ:* ${video.timestamp}\n` +
      `│ *ᴠɪᴇᴡs:* ${video.views}\n` +
      `│ *ᴄʜᴀɴɴᴇʟ:* ${video.author.name}\n` +
      `╰──────❍\n\n`
  };
};

const sendVideoDownload = async (_0x7e52ce, _0x535194, videoUrl) => {
  try {
    const downloadUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${videoUrl}`;
    const responseJson = await fetch(downloadUrl).then(res => res.json());

    if (!responseJson.success) {
      return _0x7e52ce.reply("❌ *Download failed, please try again.*");
    }

    const videoDownloadLink = responseJson.result.download_url;
    
    // Send the Video (MP4) automatically
    const videoMessage = {
      video: { url: videoDownloadLink },
      mimetype: 'video/mp4',
      caption: "*powered by lord joel *"
    };
    
    await _0x535194.sendMessage(_0x7e52ce.from, videoMessage, { quoted: _0x7e52ce });
  } catch (error) {
    console.error("Error during Video download:", error);
    return _0x7e52ce.reply("❌ *An error occurred while downloading the video file.*");
  }
};

export default video;
