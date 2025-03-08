import config from '../../config.cjs';
import os from "os";

// ⏳ Function to convert seconds to readable uptime format
const runtime = (seconds) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${d}d ${h}h ${m}m ${s}s`;
};

const AliveCmd = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const ownerNumber = config.OWNER_NUMBER + '@s.whatsapp.net';
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const isOwner = m.sender === ownerNumber;
  const isBot = m.sender === botNumber;
  const isAllowed = isOwner || isBot; // 🔥 Sirf Owner & Bot use kar sakte hain

  if (cmd === 'alive' || cmd === 'status' || cmd === 'runtime' || cmd === 'uptime') {
    if (!isAllowed) return m.reply('*You are not authorized to use this command!*');

    try {
      const status = `
*╭──❍「 ᴊᴏᴇʟ xᴍᴅ ᴀʟɪᴠᴇ ᴍᴇɴᴜ 」❍*
*│*
*│*
*╰─┬────❍*
*╭──❍*
*│υρтιмє: ${runtime(process.uptime())}*
*│яαм υѕαgє: *${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB*
*│σωηєя : ℓσя∂ ʝσєℓ*
*│тнємє: ʝσєℓ тє¢н*
*│νєяѕιση: ν¹⁰ χм∂*
*╰──────❍*`;

      await Matrix.sendMessage(m.from, {
        image: { url: `https://files.catbox.moe/jf706u.jpg` }, // 🔥 Image URL
        caption: status
      }, { quoted: m });

    } catch (e) {
      console.error("Error in alive command:", e);
      m.reply(`❌ *An error occurred:* ${e.message}`);
    }
  }
};

// keep using Joel md bot
export default AliveCmd;
