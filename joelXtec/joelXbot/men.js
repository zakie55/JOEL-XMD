import moment from 'moment-timezone';
import fs from 'fs';
import os from 'os';
import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import config from '../../config.cjs';

const alive = async (m, sock) => {
  const prefix = config.PREFIX;
  const mode = config.MODE;
  const pushName = m.pushName || 'User';

  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';

  if (cmd === "menu") {
    await m.React('💮'); // React with a loading icon
    // Calculate uptime

    const uptimeSeconds = process.uptime();
    const days = Math.floor(uptimeSeconds / (24 * 3600));
    const hours = Math.floor((uptimeSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeSeconds % 60);

    
    // Get real time
    const realTime = moment().tz("Tanzania/Dodoma").format("HH:mm:ss");
    const xtime = moment.tz("Tanzania/Dodoma").format("HH:mm:ss");
    const xdate = moment.tz("Tanzania/Dodoma").format("DD/MM/YYYY");
    const time2 = moment().tz("Tanzania/Dodoma").format("HH:mm:ss");
let pushwish = "";

if (time2 < "05:00:00") {
  pushwish = `ɢᴏᴏᴅ ᴍᴏʀɴɪɴɢ 🌄`;
} else if (time2 < "11:00:00") {
  pushwish = `ɢᴏᴏᴅ ᴍᴏʀɴɪɴɢ 🌄`;
} else if (time2 < "15:00:00") {
  pushwish = `ɢᴏᴏᴅ ᴀғᴛᴇʀɴᴏᴏɴ 🌅`;
} else if (time2 < "18:00:00") {
  pushwish = `ɢᴏᴏᴅ ᴇᴠᴇɴɪɴɢ 🌃`;
} else if (time2 < "19:00:00") {
  pushwish = `ɢᴏᴏᴅ ᴇᴠᴇɴɪɴɢ 🌃`;
} else {
  pushwish = `ɢᴏᴏᴅ ɴɪɢʜᴛ 🌌`;
}

    const aliveMessage = `ʜᴇʟʟᴏ *${pushName}* ${pushwish}

╭──❍ 「 *${config.BOT_NAME}*」❍
├ ᴘʀᴇғɪx :  *${prefix}*
├ ᴍᴏᴅᴇ :  *${mode}*
├ ᴛɪᴍᴇ : *${realTime}*
╰─┬────❍ 
╭─┴❍「 *ᴘʀᴇ ɪɴғᴏ* 」
├ ᴛʜᴇᴍᴇ= *ᴊᴏᴇʟ xᴍᴅ*
├ ᴛ ᴜsᴇʀs=  *¹⁸¹⁹*
├ ᴄʀᴇᴀᴛᴏʀ= *ᴊᴏᴇʟ ᴛᴇᴄʜ*
╰─┬────❍
╭─┴❍「 *ᴄᴏɴᴠᴇʀᴛᴏʀ* 」❍
│ ᴀᴛᴛᴘ ʟ 
│ ᴀᴛᴛᴘ2  
│ ᴀᴛᴛᴘ3  
│ ʙɪɴᴀʀʏ  
│ ᴇʙɪɴᴀʀʏ  
│ ᴇᴍᴏᴍɪx  
│ ᴍᴘ3  
╰─┬────❍
╭─┴❍「 *ʀᴇʟɪɢɪᴏɴ* 」❍
│ ʙɪʙʟᴇʙᴏᴏᴋs
│ ʙɪʙʟᴇ 
│ sᴜʀᴀʜ ᴍᴇɴᴜ
│ ǫᴜʀᴀɴᴠɪᴅ
│ ǫᴠɪᴅ
│ sᴜʀᴀʜᴀᴜᴅɪᴏ  
│ sᴜʀᴀʜᴜʀᴅᴜ  
│ ᴀsᴍᴀᴜʟʜᴜsɴᴀ  
│ ᴘʀᴏᴘʜᴇᴛɴᴀᴍᴇ  
╰─┬────❍
╭─┴❍「 *ᴀɪ ᴄᴍᴅs* 」❍
│ ᴀɪ  
│ ʙᴜɢ  
│ ʀᴇᴘᴏʀᴛ  
│ ɢᴘᴛ  
│ ʀᴇᴍɪɴɪ  
╰─┬────❍
╭─┴❍「 *ᴛᴏᴏʟ* 」❍
│ ᴄᴀʟᴄᴜʟᴀᴛᴏʀ  
│ ᴛᴇᴍᴘғɪʟᴇ  
│ ᴄʜᴇᴄᴋᴍᴀɪʟ  
│ ᴛʀᴛ  
│ ᴛᴛs  
╰─┬────❍
╭─┴❍「 *ɢʀᴏᴜᴘ* 」❍
│ ǫᴄ
│ ʟɪɴᴋɢʀᴏᴜᴘ  
│ sᴇᴛᴘᴘɢ  
│ sᴇᴛɴᴀᴍᴇ  
│ sᴇᴛᴅᴇsᴄ  
│ ᴀɴᴛɪʟᴇғᴛ
│ ɢʀᴏᴜᴘ
│ ɢʀᴏᴜᴘɪɴғᴏ
│ ɢᴄssᴇᴛᴛɪɴɢ  
│ ᴡᴇʟᴄᴏᴍᴇ  
│ ᴀᴅᴅ  
│ ᴋɪᴄᴋᴀʟʟ  
│ ᴋɪᴄᴋ  
│ ʜɪᴅᴇᴛᴀɢ  
│ ᴛᴀɢᴀʟʟ  
│ ᴀɴᴛɪʟɪɴᴋ  
│ ᴘʀᴏᴍᴏᴛᴇ  
│ ᴅᴇᴍᴏᴛᴇ  
│ ɢᴇᴛʙɪᴏ  
╰─┬────❍
╭─┴❍「 *ᴅᴏᴡɴʟᴏᴀᴅ* 」❍
│ ᴀᴘᴋ  
│ ғᴀᴄᴇʙᴏᴏᴋ  
│ ᴍᴇᴅɪᴀғɪʀᴇ  
│ ᴘɪɴᴛᴇʀᴇsᴛᴅʟ  
│ ɢᴅʀɪᴠᴇ  
│ ɪɴsᴛᴀ  
│ ᴛɪᴋᴛᴏᴋ  
╰─┬────❍
╭─┴❍「 *ᴘʀᴇᴍɪᴜᴍ* 」❍
│ ʙᴜɢᴍᴇɴᴜ  
│ ᴅᴏᴄʙᴜɢ  
│ ʟᴏᴄᴋᴄʀᴀsʜ  
│ ᴀᴍᴏᴜɴᴛʙᴜɢ <ᴀᴍᴏᴜɴᴛ>  
│ ᴘᴍʙᴜɢ <ɴᴜᴍʙᴇʀ>  
│ ᴅᴇʟʙᴜɢ <ɴᴜᴍʙᴇʀ>  
│ ᴛʀᴏʟʟʙᴜɢ <ɴᴜᴍʙᴇʀ>  
│ ᴅᴏᴄᴜʙᴜɢ <ɴᴜᴍʙᴇʀ>  
│ ᴜɴʟɪᴍɪᴛᴇᴅʙᴜɢ <ɴᴜᴍʙᴇʀ>  
│ ʙᴏᴍʙᴜɢ <ɴᴜᴍʙᴇʀ>  
│ ʟᴀɢʙᴜɢ <ɴᴜᴍʙᴇʀ>  
│ ɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>  
│ ᴅᴇʟɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>  
│ ᴛʀᴏʟʟɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>  
│ ʟᴀʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>  
│ ʙᴏᴍʙɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>  
│ ᴜɴʟɪᴍɪᴛᴇᴅɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>  
│ ᴅᴏᴄᴜɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>  
╰─┬────❍
╭─┴❍「 *ᴅᴏᴡɴʟᴏᴀᴅ* 」❍
│ ᴘʟᴀʏ
│ sᴏɴɢ
│ᴠɪᴅᴇᴏ
│ sᴍᴇᴅɪᴀ  
│ ᴍᴏᴠɪᴇ
│ ɪᴍᴀɢᴇ  
│ ᴘɪɴᴛᴇʀᴇsᴛ 
│ ʏᴛs
│ ʟʏʀɪᴄs 
╰─┬────❍
╭─┴❍「 *ᴍᴀɪɴ* 」❍
│ ᴘɪɴɢ  
│ ᴀʟɪᴠᴇ  
│ ᴏᴡɴᴇʀ 
│ sᴜᴅᴏ 
│ ᴍᴇɴᴜ  
│ ɪɴғᴏʙᴏᴛ  
╰─┬────❍
╭─┴❍「 *ᴏᴡɴᴇʀ* 」❍
│ ᴠᴠ  
│ ᴠᴠ1  
│ ᴠᴠ2  
│ ᴠᴠ3  
│ ᴜᴘᴅᴀᴛᴇ 
│ ᴜᴘᴅᴀᴛᴇɴᴏᴡ
│ ᴘᴀɪʀ
│ ғᴏʀᴡᴀʀᴅ 
│ ɢᴇᴛᴀʟʟ
│ ᴊɪᴅ
│ ᴊᴏɪɴ  
│ ʟᴇᴀᴠᴇ  
│ ʙʟᴏᴄᴋ  
│ ᴜɴʙʟᴏᴄᴋ  
│ ᴀʟʟᴄᴍᴅs 
│ ᴀɴᴛɪᴀʟʟ  
│ sᴇᴛsᴛᴀᴛᴜs  
│ ᴀᴜᴛᴏʙɪᴏ  
│ ᴀᴜᴛᴏᴛʏᴘɪɴɢ  
│ ᴀʟᴡᴀʏsᴏɴʟɪɴᴇ  
│ ᴀᴜᴛᴏʀᴇᴀᴅ  
│ ᴀᴜᴛᴏsᴠɪᴇᴡ  
╰─┬────❍
╭─┴❍「 *sᴛᴀʟᴋ* 」❍
│ ᴛʀᴜᴇᴄᴀʟʟᴇʀ  
│ ɪɴsᴛᴀsᴛᴀʟᴋ 
│ ᴛɪᴋᴛᴏᴋsᴛᴀʟᴋ  
│ ɴᴘᴍssᴛᴀʟᴋ  
│ ɢɪᴛʜᴜʙsᴛᴀʟᴋ  
╰─┬────❍
╭─┴❍「 *ᴏᴛʜᴇʀ* 」❍
│ sᴀᴘᴋ  
│ ᴜʀʟ  
│ ᴜʀʟ2  
│ ᴛᴏᴜʀʟ  
│ ᴘᴀɪʀ  
│ sᴜᴘᴘᴏʀᴛ  
│ ғᴏʟʟᴏᴡ  
│ ᴄʜᴀɴɴᴇʟ  
│ sᴜᴘᴘᴏʀᴛ  
│ ғᴏʟʟᴏᴡ  
│ ᴄʜᴀɴɴᴇʟ  
│ ɪɴᴄ  
│ ɪ  
│ ᴀᴘᴘ  
│ ᴀᴘᴘsᴇᴀʀᴄʜ  
│ ᴘʟᴀʏsᴛᴏʀᴇ  
│ ᴄʜᴀɴɴᴇʟ  
│ sᴜᴘᴘᴏʀᴛ  
│ ᴊᴏᴇʟ  
│ ᴄʜᴀᴛ  
│ ss  
╰─┬────❍
╭─┴❍「 *ɴᴇᴡ* 」❍
│ sᴄᴏʀᴇ    
│ sɴᴀᴋᴠɪᴅ 
│ ᴡᴇᴀᴛʜᴇʀ
│ ${config.NEW_CMD}
│ ǫʀ
│ ʀᴇᴀᴅǫʀ
│ ᴘʀᴏғɪʟᴇ 
│ sʜᴏʀᴛᴇɴᴜʀʟ  
│ ɢɪᴠᴇᴛᴇxᴛ  
│ ғᴀɴᴄʏ   
╰─┬────❍
╭─┴❍「 *sᴀʏ* 」❍
│ sᴀʏ  
│ ᴛᴛs  
│ ʙᴀss  
│ ʙʟᴏᴡɪɴ  
│ ᴅᴇᴇᴘ  
│ ᴇᴀʀʀᴀᴘᴇ  
│ ғᴀsᴛ  
│ ғᴀᴛ  
│ ɴɪɢʜᴛᴛɪᴍᴇ  
│ ʀᴇᴠᴇʀsᴇ  
│ ʀᴏʙᴏᴛ  
│ sʟᴏᴡ  
│ sᴍᴏᴏᴛʜ  
│ ᴛʏᴘᴀɪ  
╰─┬────❍
╭─┴❍「 *ʟᴏɢᴏ* 」❍
│ ʟᴏɢᴏ  
│ ʟᴏɢᴏ1  
│ ʟᴏɢᴏ2  
│ ʟᴏɢᴏ3  
│ ʟᴏɢᴏ4  
│ ʟᴏɢᴏ5
│ ʟᴏɢᴏ6  
│ ʟᴏɢᴏ7  
│ ʟᴏɢᴏ8  
│ ʟᴏɢᴏ9  
│ ʟᴏɢᴏ10  
│ ʟᴏɢᴏ11  
│ ʟᴏɢᴏ12  
│ ʟᴏɢᴏ13  
│ ʟᴏɢᴏ14  
│ ʟᴏɢᴏ15  
│ ʟᴏɢᴏ16  
│ ʟᴏɢᴏ17  
│ ʟᴏɢᴏ18  
│ ʟᴏɢᴏ19  
╰─┬────❍
╭─┴❍「 *ᴡᴀɪғᴜ* 」❍
│ ʜɪɢʜғɪᴠᴇ  
│ ɢʟᴏᴍᴘ  
│ ʜᴀɴᴅʜᴏʟᴅ  
│ sʜɪɴᴏʙᴜ  
│ ᴄᴜᴅᴅʟᴇ  
│ ᴄʀɪɴɢᴇ  
│ sᴀᴅ  
│ ʜᴀᴘᴘʏ  
│ ᴅᴀɴᴄᴇ  
│ sᴍᴜɢ  
│ ʙʟᴜsʜ  
│ ᴀᴡᴏ  
│ ᴡᴀᴠᴇ  
│ sᴍɪʟᴇ  
╰────────────❍
*${config.CAPTION}*`;

    await m.React('☄️'); // React with a success icon

    sock.sendMessage(
      m.from,
      {
        text: aliveMessage,
        contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363317462952356@newsletter',
            newsletterName: "ᴊᴏᴇʟ xᴅ ʙᴏᴛ",
            serverMessageId: -1,
          },
          forwardingScore: 999, // Score to indicate it has been forwarded
          externalAdReply: {
            title: "ᴊᴏᴇʟ xᴅ ʙᴏᴛ ᴠ ⁷",
            body: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ",
            thumbnailUrl: 'https://avatars.githubusercontent.com/u/162905644?v=4', // Add thumbnail URL if required
            sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K', // Add source URL if necessary
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
  }
};

export default alive;
