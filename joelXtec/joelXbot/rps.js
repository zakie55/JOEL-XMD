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

  if (cmd === "mx") {
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
│   
╰────────────❍
*${config.CAPTION}*`;

    await m.React('☄️'); // React with a success icon

    // Prepare the first image (this will be sent with text as the main image)
    const media1 = await prepareWAMessageMedia({ url: 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/joelXbot.jpg' }, { upload: sock.upload });

    // Send the message with the first image (text + external ad)
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
            thumbnailUrl: 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/joelXbot.jpg',
            sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );

    // Send the second image as a photo (no caption)
    sock.sendMessage(
      m.from,
      {
        image: { url: 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/joelXbot.jpg' }, // Second image URL
      },
      { quoted: m }
    );
  }
};

export default alive;
