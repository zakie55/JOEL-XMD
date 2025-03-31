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

  if (cmd === "menu2") {
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

help
menu 
ping`;

    // Prepare the image media
    const imageMessage = await prepareWAMessageMedia(
      { url: 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/alive.jpg' },
      { upload: sock.uploadMedia }
    );

    const aliveMessageWithImage = generateWAMessageFromContent(m.from, {
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
          body: "ᴘᴏᴡᴇʀᴇʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ",
          thumbnailUrl: 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/joelXbot.jpg', // Add thumbnail URL if required
          sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K', // Add source URL if necessary
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
      ...imageMessage,
    });

    await m.React('☄️'); // React with a success icon

    // Send the message with the image
    await sock.sendMessage(m.from, aliveMessageWithImage, { quoted: m });
  }
};

export default alive;
