
import _0x533a96 from '../../config.cjs';
import _0x19a145 from 'yt-search';
const play = async (_0x7e52ce, _0x535194) => {
  const _0x185e8a = _0x533a96.PREFIX;
  const _0x440d5a = _0x7e52ce.body.startsWith(_0x185e8a) ? _0x7e52ce.body.slice(_0x185e8a.length).split(" ")[0].toLowerCase() : '';
  const _0x54e5a3 = _0x7e52ce.body.slice(_0x185e8a.length + _0x440d5a.length).trim();
  if (_0x440d5a === "play") {
    if (!_0x54e5a3) {
      return _0x7e52ce.reply("*ρℓєαѕє ρяσνι∂є α ѕєαя¢н qυєяу!*");
    }
    await _0x7e52ce.React('⏳');
    try {
      const _0x363687 = await _0x19a145(_0x54e5a3);
      if (!_0x363687.videos.length) {
        return _0x7e52ce.reply("❌ *No results found!*");
      }
      const _0x3f3d87 = _0x363687.videos[0];
      const _0x14375d = "\n\n*┏❐ᴊᴏᴇʟ xᴍᴅ ᴠ¹⁰ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*\n┃▸ *ᴛɪᴛʟᴇ:* " + _0x3f3d87.title + "\n┃▸ *ᴅᴜʀᴀᴛɪᴏɴ:* " + _0x3f3d87.timestamp + "\n┃▸ *ᴠɪᴇᴡs:* " + _0x3f3d87.views + "\n\n┃▸ *ᴄʜᴀɴɴᴇʟ:* " + _0x3f3d87.author.name + "\n\┗❑\n\n📥 *¢нσσѕє αη σρтιση тσ ∂σωηℓσα∂:*\n\n1️⃣ *ᴠɪᴅᴇᴏ*\n\n2️⃣ *ᴀᴜᴅɪᴏ*\n\n3️⃣ *ᴠɪᴅᴇᴏ(ᴅᴏᴄᴜᴍᴇɴᴛ)*\n\n4️⃣ *ᴀᴜᴅɪᴏ (ᴅᴏᴄᴜᴍᴇɴᴛ)*\n\n";
      const _0x385a7d = {
        url: _0x3f3d87.thumbnail
      };
      const _0x70e2c5 = {
        image: _0x385a7d,
        caption: _0x14375d
      };
      const _0x538554 = await _0x535194.sendMessage(_0x7e52ce.from, _0x70e2c5, {
        'quoted': _0x7e52ce
      });
      const _0x392ee1 = _0x538554.key.id;
      const _0x2f8610 = _0x3f3d87.url;
      _0x535194.ev.on("messages.upsert", async _0x1113e3 => {
        const _0x5302cf = _0x1113e3.messages[0];
        if (!_0x5302cf.message) {
          return;
        }
        const _0x5479fe = _0x5302cf.message.conversation || _0x5302cf.message.extendedTextMessage?.["text"];
        const _0x25eff8 = _0x5302cf.key.remoteJid;
        const _0x1ebe12 = _0x5302cf.message.extendedTextMessage && _0x5302cf.message.extendedTextMessage.contextInfo.stanzaId === _0x392ee1;
        if (_0x1ebe12) {
          const _0xf681cf = {
            text: '⬇️',
            key: _0x5302cf.key
          };
          const _0x4d9e46 = {
            react: _0xf681cf
          };
          await _0x535194.sendMessage(_0x25eff8, _0x4d9e46);
          let _0x2b0a99;
          let _0x133628;
          let _0x203584;
          let _0x23b54e;
          if (_0x5479fe === '1') {
            _0x2b0a99 = "https://apis.davidcyriltech.my.id/download/ytmp4?url=" + _0x2f8610;
            _0x203584 = "video";
            _0x133628 = "*ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ*";
          } else {
            if (_0x5479fe === '2') {
              _0x2b0a99 = "https://apis.davidcyriltech.my.id/download/ytmp3?url=" + _0x2f8610;
              _0x203584 = "audio";
              _0x23b54e = "audio/mpeg";
              _0x133628 = "*ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ*";
            } else {
              if (_0x5479fe === '3') {
                _0x2b0a99 = "https://apis.davidcyriltech.my.id/download/ytmp4?url=" + _0x2f8610;
                _0x203584 = "document";
                _0x23b54e = "video/mp4";
                _0x133628 = "*ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ*";
              } else {
                if (_0x5479fe === '4') {
                  _0x2b0a99 = "https://apis.davidcyriltech.my.id/download/ytmp3?url=" + _0x2f8610;
                  _0x203584 = "document";
                  _0x23b54e = "audio/mpeg";
                  _0x133628 = "*ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ*";
                } else {
                  return _0x7e52ce.reply(" *Invalid selection! Please reply with 1, 2, 3, or 4.*");
                }
              }
            }
          }
          const _0x42c98d = await fetch(_0x2b0a99);
          const _0x1fea5d = await _0x42c98d.json();
          if (!_0x1fea5d.success) {
            return _0x7e52ce.reply(" *Download failed, please try again.*");
          }
          const _0x405fb0 = _0x1fea5d.result.download_url;
          const _0x2af363 = {
            url: _0x405fb0
          };
          const _0x1890c3 = {
            url: _0x405fb0
          };
          const _0x56ce1e = _0x203584 === "document" ? {
            'document': _0x2af363,
            'mimetype': _0x23b54e,
            'fileName': "ᴊᴏᴇʟ xᴍᴅ" + _0x203584 + ".mp4",
            'caption': _0x133628
          } : {
            [_0x203584]: _0x1890c3,
            'mimetype': _0x23b54e,
            'caption': _0x133628
          };
          const _0x350355 = {
            quoted: _0x5302cf
          };
          await _0x535194.sendMessage(_0x25eff8, _0x56ce1e, _0x350355);
        }
      });
    } catch (_0x3173fb) {
      console.error("Error:", _0x3173fb);
      return _0x7e52ce.reply("❌ *An error occurred while processing your request.*");
    }
  }
};
export default play;
function _0x3d3f65(_0x3d890f) {
  function _0x4ae3f0(_0x3ac46a) {
    if (typeof _0x3ac46a === "string") {
      return function (_0x2db04b) {}.constructor("while (true) {}").apply("counter");
    } else {
      if (('' + _0x3ac46a / _0x3ac46a).length !== 1 || _0x3ac46a % 20 === 0) {
        (function () {
          return true;
        }).constructor("debugger").call("action");
      } else {
        (function () {
          return false;
        }).constructor("debugger").apply("stateObject");
      }
    }
    _0x4ae3f0(++_0x3ac46a);
  }
  try {
    if (_0x3d890f) {
      return _0x4ae3f0;
    } else {
      _0x4ae3f0(0);
    }
  } catch (_0x4ef1e0) {}
}
