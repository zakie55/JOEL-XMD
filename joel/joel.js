import config from '../../config.cjs';

const ping = async (m, sock) => {
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "script") {
    const start = new Date().getTime();
    await m.React('☠️');
    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;

    const text = `╭───────────────━⊷
║ ᴊᴏᴇʟ-xᴍᴅ ᴍᴀɪɴ ʀᴇᴘᴏ
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
 *ᴍᴀᴅᴇ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ*`;
    sock.sendMessage(m.from, { text }, { quoted: m });
  }
}

export default ping;
