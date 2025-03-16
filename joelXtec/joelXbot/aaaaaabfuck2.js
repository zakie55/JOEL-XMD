import _0x11ec39 from '../../config.cjs';
import _0x1e4301 from 'yt-search';

const play = async (_0x126590, _0x3b9015) => {
  const _0x52890d = _0x11ec39.PREFIX;
  const _0x588373 = _0x126590.body.startsWith(_0x52890d) 
    ? _0x126590.body.slice(_0x52890d.length).split(" ")[0x0].toLowerCase() 
    : '';
  const _0x195e93 = _0x126590.body.slice(_0x52890d.length + _0x588373.length).trim();

  if (_0x588373 === 'play2') {
    if (!_0x195e93) {
      return _0x126590.reply("❌ *Please provide a search query!*");
    }
    
    await _0x126590.React('⏳');
    
    try {
      const _0x3e2e17 = await _0x1e4301(_0x195e93);
      if (!_0x3e2e17.videos.length) {
        return _0x126590.reply("❌ *No results found!*");
      }
      
      const _0x13d1e1 = _0x3e2e17.videos[0x0];
      const _0x2955c5 = `
      ╭━━━〔 *ᴅᴇᴍᴏɴ sʟᴀʏᴇʀ* 〕━━━
      ┃▸ *ᴛɪᴛʟᴇ:* ${_0x13d1e1.title}
      ┃▸ *ᴅᴜʀᴀᴛɪᴏɴ:* ${_0x13d1e1.timestamp}
      ┃▸ *ᴠɪᴇᴡs:* ${_0x13d1e1.views}
      ┃▸ *ᴄʜᴀɴɴᴇʟ:* ${_0x13d1e1.author.name}
      ╰━━━━━━━━━━━━━━━━━━
      📥 *ᴄʜᴏᴏsᴇ ᴀɴ ᴏᴘᴛɪᴏɴ ᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ:*
      *1️⃣ ᴠɪᴅᴇᴏ*
      *2️⃣ ᴀᴜᴅɪᴏ*
      *3️⃣ ᴠɪᴅᴇᴏ (ᴅᴏᴄᴜᴍᴇɴᴛ)*
      *4️⃣ ᴀᴜᴅɪᴏ (ᴅᴏᴄᴜᴍᴇɴᴛ)*
      `;

      const _0x2fb6d5 = { 'url': _0x13d1e1.thumbnail };
      const _0x5c46de = { 'image': _0x2fb6d5, 'caption': _0x2955c5 };
      const _0x43f0e4 = await _0x3b9015.sendMessage(_0x126590.from, _0x5c46de, { 'quoted': _0x126590 });
      const _0x343189 = _0x43f0e4.key.id;
      const _0x2da495 = _0x13d1e1.url;

      // Audio download
      const audioRes = await fetch(`https://api.dreaded.site/api/ytdl/audio?url=${encodeURIComponent(_0x2da495)}&apikey=gifted`);
      const audioData = await audioRes.json();

      if (audioData.status === 200 && audioData.success) {
        const audioUrl = audioData.result.download_url;
        await _0x3b9015.sendMessage(_0x126590.from, { 
          'audio': { 'url': audioUrl }, 
          'mimetype': 'audio/mp4',
          'caption': '🎵 *Here is your audio!*'
        }, { 'quoted': _0x126590 });
      } else {
        _0x126590.reply("❌ *Failed to download the audio. Please try again later!*");
      }

      // Video download
      const videoRes = await fetch(`https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(_0x2da495)}&apikey=gifted`);
      const videoData = await videoRes.json();

      if (videoData.status === 200 && videoData.success) {
        const videoUrl = videoData.result.download_url;
        await _0x3b9015.sendMessage(_0x126590.from, { 
          'video': { 'url': videoUrl }, 
          'mimetype': 'video/mp4',
          'caption': '📹 *Here is your video!*'
        }, { 'quoted': _0x126590 });
      } else {
        _0x126590.reply("❌ *Failed to download the video. Please try again later!*");
      }

    } catch (error) {
      console.error("Error:", error);
      _0x126590.reply("❌ *An error occurred while processing your request!*");
    }
  }
};

export default play;
