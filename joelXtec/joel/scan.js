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

  if (cmd === 'pair' || cmd === 'code' || cmd === 'deploy' || cmd === 'scan') {
    if (!isAllowed) return m.reply('*You are not authorized to use this command!*');

    try {
      const status = `
*❍「 ᴊᴏᴇʟ xᴍᴅ ᴘᴀɪʀ sɪᴛᴇ 」❍*
  ᴛᴏ ᴜsᴇ ᴛʜᴇ _ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ ᴘᴀɪʀ sɪᴛᴇ_ ᴀɴᴅ ʟɪɴᴋ ʏᴏᴜʀ ᴡʜᴀᴛsᴀᴘᴘ ғᴏʀ ᴅᴇᴘʟᴏʏɪɴɢ ᴛʜᴇ ᴊᴏᴇʟ xᴍᴅ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ. ғᴏʟʟᴏᴡ ᴛʜᴇsᴇ sᴛᴇᴘs:

1. *ɢᴏ ᴛᴏ ᴛʜᴇ ᴘᴀɪʀɪɴɢ sɪᴛᴇ*:
   - ᴏᴘᴇɴ ᴛʜᴇ ᴡᴇʙᴘᴀɢᴇ ᴡʜᴇʀᴇ ʏᴏᴜ ғᴏᴜɴᴅ ᴛʜᴇ _ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ ᴘᴀɪʀ sɪᴛᴇ._ ᴍᴀᴋᴇ sᴜʀᴇ ɪᴛ*s ᴀ ᴛʀᴜsᴛᴇᴅ sɪᴛᴇ.
sɪᴛᴇ ᴜʀʟ: *https://session-site-navy.vercel.app*

2. *ᴇɴᴛᴇʀ ʏᴏᴜʀ ᴘʜᴏɴᴇ ɴᴜᴍʙᴇʀ*:
   - ɪɴ ᴛʜᴇ ɪɴᴘᴜᴛ ʙᴏx  ʏᴏᴜ ᴡɪʟʟ ɴᴇᴇᴅ ᴛᴏ *ᴇɴᴛᴇʀ ʏᴏᴜʀ ᴘʜᴏɴᴇ ɴᴜᴍʙᴇʀ* ᴡɪᴛʜ ᴛʜᴇ ᴄᴏᴜɴᴛʀʏ ᴄᴏᴅᴇ. ғᴏʀ ᴇxᴀᴍᴘʟᴇ:
     - ɪғ ʏᴏᴜ ᴀʀᴇ ɪɴ ᴛʜᴇ ᴜs_ ʏᴏᴜʀ ᴘʜᴏɴᴇ ɴᴜᴍʙᴇʀ ᴍɪɢʜᴛ ʟᴏᴏᴋ ʟɪᴋᴇ: *1 (123) 456-7890*.
     - ɪғ ʏᴏᴜ ᴀʀᴇ ɪɴ ᴛʜᴇ ᴜᴋ_ ɪᴛ ᴍɪɢʜᴛ ʟᴏᴏᴋ ʟɪᴋᴇ: *44 (1234) 567890*.
   - ᴇɴsᴜʀᴇ ʏᴏᴜ  ɪɴᴄʟᴜᴅᴇ ᴛʜᴇ *ᴄᴏᴜɴᴛʀʏ ᴄᴏᴅᴇ* ғᴏʀ ʏᴏᴜʀ ᴘʜᴏɴᴇ ɴᴜᴍʙᴇʀ . ɴᴇᴠᴇʀ sᴛᴀʀᴛ ᴡɪᴛʜ "+"

3. *ᴄʟɪᴄᴋ ᴏɴ ᴛʜᴇ "ᴄᴏᴅᴇ" ʙᴜᴛᴛᴏɴ*:
   - ᴏɴᴄᴇ ʏᴏᴜ’ᴠᴇ ᴇɴᴛᴇʀᴇᴅ ʏᴏᴜʀ ᴘʜᴏɴᴇ ɴᴜᴍʙᴇʀ_ ᴄʟɪᴄᴋ ᴏɴ ᴛʜᴇ *"ᴄᴏᴅᴇ"* ʙᴜᴛᴛᴏɴ ᴛᴏ ɪɴɪᴛɪᴀᴛᴇ ᴛʜᴇ ᴘᴀɪʀɪɴɢ ᴘʀᴏᴄᴇss.

4. *ʀᴇᴄᴇɪᴠᴇ ᴠᴇʀɪғɪᴄᴀᴛɪᴏɴ ᴄᴏᴅᴇ*:
   - ᴀғᴛᴇʀ ʏᴏᴜ ᴄʟɪᴄᴋ ᴛʜᴇ _ᴄᴏᴅᴇ_ ʙᴜᴛᴛᴏɴ. ʏᴏᴜ sʜᴏᴜʟᴅ ʀᴇᴄᴇɪᴠᴇ ᴀ *ᴠᴇʀɪғɪᴄᴀᴛɪᴏɴ ᴄᴏᴅᴇ* ᴏɴ ʏᴏᴜʀ ᴡʜᴀᴛsᴀᴘᴘ ɴᴜᴍʙᴇʀ. ᴍᴀᴋᴇ sᴜʀᴇ ʏᴏᴜ ʜᴀᴠᴇ ᴡʜᴀᴛsᴀᴘᴘ ɪɴsᴛᴀʟʟᴇᴅ ᴏɴ ʏᴏᴜʀ ᴘʜᴏɴᴇ ᴀɴᴅ ᴛʜᴀᴛ ʏᴏᴜʀ ᴘʜᴏɴᴇ ɴᴜᴍʙᴇʀ ɪs ᴀᴄᴛɪᴠᴇ ᴀɴᴅ ᴄᴀɴ ʀᴇᴄᴇɪᴠᴇ ᴍᴇssᴀɢᴇs.

5. *ᴇɴᴛᴇʀ ᴛʜᴇ ᴠᴇʀɪғɪᴄᴀᴛɪᴏɴ ᴄᴏᴅᴇ*:
   - ᴇɴᴛᴇʀ ᴛʜᴇ *ᴠᴇʀɪғɪᴄᴀᴛɪᴏɴ ᴄᴏᴅᴇ* ʏᴏᴜ ʀᴇᴄᴇɪᴠᴇᴅ ɪɴᴛᴏ ᴛʜᴇ ʀᴇᴏ̨ᴜɪʀᴇᴅ ғɪᴇʟᴅ ᴏɴ ᴛʜᴇ ᴡᴇʙsɪᴛᴇ.

6. *ᴄᴏᴍᴘʟᴇᴛᴇ ᴛʜᴇ ᴘᴀɪʀɪɴɢ*:
- ᴏɴᴄᴇ ʏᴏᴜ*ᴠᴇ ᴇɴᴛᴇʀᴇᴅ ᴛʜᴇ ᴄᴏᴅᴇ ᴄᴏʀʀᴇᴄᴛʟʏ. ᴛʜᴇ sɪᴛᴇ sʜᴏᴜʟᴅ ᴄᴏɴғɪʀᴍ ᴛʜᴀᴛ ʏᴏᴜʀ ᴘʜᴏɴᴇ ɴᴜᴍʙᴇʀ ʜᴀs ʙᴇᴇɴ ʟɪɴᴋᴇᴅ. ᴛʜɪs ᴡɪʟʟ sᴇᴛ ᴜᴘ ᴛʜᴇ ᴊᴏᴇʟ xᴍᴅ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ ᴡɪᴛʜ ʏᴏᴜʀ ᴀᴄᴄᴏᴜɴᴛ.

7. *ᴅᴇᴘʟᴏʏ ᴛʜᴇ ʙᴏᴛ*:
   - ɴᴏᴡ ᴛʜᴀᴛ ʏᴏᴜʀ ᴡʜᴀᴛsᴀᴘᴘ ɪs ᴘᴀɪʀᴇᴅ_ ʏᴏᴜ ᴄᴀɴ sᴛᴀʀᴛ ᴜsɪɴɢ ᴛʜᴇ ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ ғᴇᴀᴛᴜʀᴇs ᴅɪʀᴇᴄᴛʟʏ ᴡɪᴛʜɪɴ ᴡʜᴀᴛsᴀᴘᴘ.

ᴀᴅᴅɪᴛɪᴏɴᴀʟ ɪɴғᴏʀᴍᴀᴛɪᴏɴ:
- *sᴇᴄᴜʀɪᴛʏ*: ʙᴇ ᴄᴀᴜᴛɪᴏᴜs ᴡʜᴇɴ ᴇɴᴛᴇʀɪɴɢ sᴇɴsɪᴛɪᴠᴇ ɪɴғᴏʀᴍᴀᴛɪᴏɴ ᴏɴʟɪɴᴇ. ᴍᴀᴋᴇ sᴜʀᴇ ʏᴏᴜ'ʀᴇ ᴏɴ ᴛʜᴇ ᴏғғɪᴄɪᴀʟ, ʟᴇɢɪᴛɪᴍᴀᴛᴇ ᴡᴇʙsɪᴛᴇ ғᴏʀ ᴛʜᴇ ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ.
- *ᴡʜᴀᴛsᴀᴘᴘ ᴜsᴀɢᴇ*: ᴛʜɪs ʙᴏᴛ ʟɪᴋᴇʟʏ ᴜsᴇs ᴛʜᴇ ᴡʜᴀᴛsᴀᴘᴘ ʙᴜsɪɴᴇss ᴀᴘɪ_ sᴏ ᴇɴsᴜʀᴇ ᴛʜᴀᴛ ʏᴏᴜʀ ᴡʜᴀᴛsᴀᴘᴘ ɴᴜᴍʙᴇʀ ᴄᴀɴ ᴡᴏʀᴋ ᴡɪᴛʜ sᴜᴄʜ ɪɴᴛᴇɢʀᴀᴛɪᴏɴs.

ᴀғᴛᴇʀ ʟɪɴᴋɪɴɢ_ ʏᴏᴜ ᴄᴀɴ sᴛᴀʀᴛ ɪɴᴛᴇʀᴀᴄᴛɪɴɢ ᴡɪᴛʜ ᴛʜᴇ ʙᴏᴛ ᴛʜʀᴏᴜɢʜ ᴡʜᴀᴛsᴀᴘᴘ ᴀɴᴅ ᴅᴇᴘʟᴏʏ ᴀɴʏ ᴏғ ɪᴛs ғᴜɴᴄᴛɪᴏɴs.`;

      await Matrix.sendMessage(m.from, {
        image: { url: `https://files.catbox.moe/a4a29f.jpg` }, // 🔥 Image URL
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
