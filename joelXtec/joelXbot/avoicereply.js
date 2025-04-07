import moment from 'moment-timezone';
import fs from 'fs';
import os from 'os';
import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import config from '../../config.cjs';

const joel = async (m, sock) => {
  const mode = config.MODE;
  const pushName = m.pushName || 'User';

  const cmd = m.body.toLowerCase(); // Directly use the message body as the command

  if (cmd === "hello" || cmd === "bot" || cmd === ".menu") {
    await m.React('⏳'); // Loading reaction
    
    // Calculate uptime
    const uptimeSeconds = process.uptime();
    const days = Math.floor(uptimeSeconds / (24 * 3600));
    const hours = Math.floor((uptimeSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeSeconds % 60);
    
    // Get real-time in Tanzania timezone
    const realTime = moment().tz("Tanzania/Dodoma").format("HH:mm:ss");
    const xtime = moment.tz("Tanzania/Dodoma").format("HH:mm:ss");
    const xdate = moment.tz("Tanzania/Dodoma").format("DD/MM/YYYY");
    const time2 = moment().tz("Tanzania/Dodoma").format("HH:mm:ss");

    let pushwish = "";

    // Determine the greeting based on the time of day
    if (time2 < "05:00:00") {
      pushwish = `Good Morning 🌄`;
    } else if (time2 < "11:00:00") {
      pushwish = `Good Morning 🌄`;
    } else if (time2 < "15:00:00") {
      pushwish = `Good Afternoon 🌅`;
    } else if (time2 < "18:00:00") {
      pushwish = `Good Evening 🌃`;
    } else if (time2 < "19:00:00") {
      pushwish = `Good Evening 🌃`;
    } else {
      pushwish = `Good Night 🌌`;
    }

    const aliveMessage = `*CODES BY JOEL XMD*
    *---------------------`;

    await m.React('☄️'); // React with a success icon
    
    sock.sendMessage(
      m.from,
      {
        audio: { url: 'https://github.com/tharumin/Alexa_Voice/raw/refs/heads/main/hm.mp3' },
        mimetype: 'audio/mp4',
        ptt: true,
        contextInfo: { 
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363317462952356@newsletter',
            newsletterName: 'ᴊᴏᴇʟ xᴅ ʙᴏᴛ ᴠ ⁷',
            serverMessageId: 143
          },
          externalAdReply: {
            title: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ",
            body: `have a nice day `,
            thumbnailUrl: 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/areply.jpg',
            sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
  }

  // Add new command: "morning" or "good morning"
  if (cmd === "morning" || cmd === "good morning") {
    await m.React('⏳'); // Loading reaction
    
    // Send a "Good Morning" voice message
    sock.sendMessage(
      m.from,
      {
        audio: { url: 'https://github.com/sadiyamin/alexa-database/raw/refs/heads/main/Media/good_morning.mp3' },
        mimetype: 'audio/mp4',
        ptt: true,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363317462952356@newsletter',
            newsletterName: 'ᴊᴏᴇʟ xᴅ ʙᴏᴛ ᴠ ⁷',
            serverMessageId: 143
          },
          externalAdReply: {
            title: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ",
            body: `Good Morning! Have a great day!`,
            thumbnailUrl: 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/areply.jpg',
            sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
  }

  // Add new command: "night" or "good night"
  if (cmd === "night" || cmd === "good night") {
    await m.React('⏳'); // Loading reaction
    
    // Send a "Good Night" voice message
    sock.sendMessage(
      m.from,
      {
        audio: { url: 'https://github.com/sadiyamin/alexa-database/raw/refs/heads/main/Media/good_night.mp3' },
        mimetype: 'audio/mp4',
        ptt: true,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363317462952356@newsletter',
            newsletterName: 'ᴊᴏᴇʟ xᴅ ʙᴏᴛ ᴠ ⁷',
            serverMessageId: 143
          },
          externalAdReply: {
            title: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ",
            body: `Good Night! Sleep tight!`,
            thumbnailUrl: 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/areply.jpg',
            sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
  }

  // Add new command: "hm" or "hmm"
  if (cmd === "hm" || cmd === "hmm") {
    await m.React('⏳'); // Loading reaction
    
    // Send a "Hmm" voice message
    sock.sendMessage(
      m.from,
      {
        audio: { url: 'https://github.com/tharumin/Alexa_Voice/raw/refs/heads/main/hm.mp3' },
        mimetype: 'audio/mp4',
        ptt: true,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363317462952356@newsletter',
            newsletterName: 'ᴊᴏᴇʟ xᴅ ʙᴏᴛ ᴠ ⁷',
            serverMessageId: 143
          },
          externalAdReply: {
            title: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ",
            body: `Hmm... Something's on my mind...`,
            thumbnailUrl: 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/areply.jpg',
            sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
  }

  // Add new command: "oye", "oya", "haha", "hehe", or "oka ustad"
  if (cmd === "oye" || cmd === "oya" || cmd === "haha" || cmd === "hehe" || cmd === "oka ustad") {
    await m.React('⏳'); // Loading reaction
    
    // Send a "Oya Kawada" voice message
    sock.sendMessage(
      m.from,
      {
        audio: { url: 'https://github.com/tharumin/Alexa_Voice/raw/refs/heads/main/oya_kawada.mp3' },
        mimetype: 'audio/mp4',
        ptt: true,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363317462952356@newsletter',
            newsletterName: 'ᴊᴏᴇʟ xᴅ ʙᴏᴛ ᴠ ⁷',
            serverMessageId: 143
          },
          externalAdReply: {
            title: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ",
            body: `Haha, Oya Ustad!`,
            thumbnailUrl: 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/areply.jpg',
            sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
  }

  // Add new command: "love", "love you", or "i love you"
  if (cmd === "love" || cmd === "love you" || cmd === "i love you") {
    await m.React('⏳'); // Loading reaction
    
    // Send a "I Love You" voice message
    sock.sendMessage(
      m.from,
      {
        audio: { url: 'https://github.com/sadiyamin/alexa-database/raw/refs/heads/main/Media/i_love_you.mp3' },
        mimetype: 'audio/mp4',
        ptt: true,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363317462952356@newsletter',
            newsletterName: 'ᴊᴏᴇʟ xᴅ ʙᴏᴛ ᴠ ⁷',
            serverMessageId: 143
          },
          externalAdReply: {
            title: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ",
            body: `Love You! ❤️`,
            thumbnailUrl: 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/areply.jpg',
            sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
  }

  // Add new command: "wow" or "nice"
  if (cmd === "wow" || cmd === "nice") {
    await m.React('⏳'); // Loading reaction
    
    // Send a "Wow! Nice!" voice message
    sock.sendMessage(
      m.from,
      {
        audio: { url: 'https://github.com/VajiraTech/IZUMI-AUTO-VOICER/raw/main/kellek%20oni.mp3' },
        mimetype: 'audio/mp4',
        ptt: true,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363317462952356@newsletter',
            newsletterName: 'ᴊᴏᴇʟ xᴅ ʙᴏᴛ ᴠ ⁷',
            serverMessageId: 143
          },
          externalAdReply: {
            title: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ",
            body: `Wow, that's nice!`,
            thumbnailUrl: 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/areply.jpg',
            sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
  }
};

export default joel;
