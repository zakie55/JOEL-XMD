import moment from 'moment-timezone';
import fs from 'fs';
import os from 'os';
import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import config from '../../config.cjs';

const audioLinks = {
  ".menu": "https://github.com/tharumin/Alexa_Voice/raw/refs/heads/main/hm.mp3",
  "joel": "https://github.com/tharumin/Alexa_Voice/raw/refs/heads/main/hm.mp3",
  ".repo": "https://github.com/tharumin/Alexa_Voice/raw/refs/heads/main/hm.mp3",
  ".alive": "https://github.com/betingrich3/Bentley_DATABASE/raw/refs/heads/main/autovoice/",
  "hi": "https://github.com/betingrich3/Bentley_DATABASE/raw/refs/heads/main/autovoice/y2mate.com%20-%20_original%20sound%20-%20ferrari_forza.mp3",
  "hello": "https://github.com/tharumin/Alexa_Voice/raw/refs/heads/main/hm.mp3",
  "morning": "https://github.com/sadiyamin/alexa-database/raw/refs/heads/main/Media/good_morning.mp3",
  "good morning": "https://github.com/sadiyamin/alexa-database/raw/refs/heads/main/Media/good_morning.mp3",
  "night": "https://github.com/sadiyamin/alexa-database/raw/refs/heads/main/Media/good_night.mp3",
  "good night": "https://github.com/sadiyamin/alexa-database/raw/refs/heads/main/Media/good_night.mp3",
  "hm": "https://github.com/tharumin/Alexa_Voice/raw/refs/heads/main/hm.mp3",
  "hmm": "https://github.com/tharumin/Alexa_Voice/raw/refs/heads/main/hm.mp3",
  "aww": "https://github.com/tharumin/Alexa_Voice/raw/refs/heads/main/hm.mp3",
  "oye": "https://github.com/tharumin/Alexa_Voice/raw/refs/heads/main/oya_kawada.mp3",
  "ustad": "https://github.com/tharumin/Alexa_Voice/raw/refs/heads/main/oya_kawada.mp3",
  "haha": "https://github.com/tharumin/Alexa_Voice/raw/refs/heads/main/oya_kawada.mp3",
  "hehe": "https://github.com/tharumin/Alexa_Voice/raw/refs/heads/main/hm.mp3",
  "oka": "https://github.com/VajiraTech/IZUMI-AUTO-VOICER/raw/main/kawa.mp3",
  "wow": "https://github.com/VajiraTech/IZUMI-AUTO-VOICER/raw/main/kellek%20oni.mp3",
  "geo": "https://github.com/VajiraTech/IZUMI-AUTO-VOICER/raw/main/wesi(tbg).mp3",
  "I love you": "https://github.com/sadiyamin/alexa-database/raw/refs/heads/main/Media/i_love_you.mp3",
  "love": "https://github.com/sadiyamin/alexa-database/raw/refs/heads/main/Media/i_love_you.mp3",
  "love you": "https://github.com/sadiyamin/alexa-database/raw/refs/heads/main/Media/i_love_you.mp3",
  "ohh": "https://github.com/sadiyamin/alexa-database/raw/refs/heads/main/Media/i_love_you.mp3",
  "dear": "https://github.com/sadiyamin/alexa-database/raw/refs/heads/main/Media/pakaya.mp3",
  "sir": "https://github.com/sadiyamin/alexa-database/raw/refs/heads/main/Media/pakaya.mp3",  
  "sobx": "https://github.com/sadiyamin/alexa-database/raw/refs/heads/main/Media/pakaya.mp3",
  "nice": "https://github.com/sadiyamin/alexa-database/raw/refs/heads/main/Media/pakaya.mp3",
  "bye": "https://github.com/sadiyamin/alexa-database/raw/refs/heads/main/Media/pakaya.mp3",
  "by": "https://github.com/sadiyamin/alexa-database/raw/refs/heads/main/Media/pakaya.mp3"
};

// Check if Auto-reply is enabled or not
let autoReplyEnabled = config.AUTO_REPLY;

const joel = async (m, sock) => {
  const pushName = m.pushName || 'User';

  // Check for toggling autoreply through message
  if (m.body.toLowerCase() === "autoreply on") {
    autoReplyEnabled = true;
    await sock.sendMessage(m.from, { text: "Autoreply is now enabled!" });
    return;
  }

  if (m.body.toLowerCase() === "autoreply off") {
    autoReplyEnabled = false;
    await sock.sendMessage(m.from, { text: "Autoreply is now disabled!" });
    return;
  }

  // Autoreply logic when enabled
  if (autoReplyEnabled) {
    const messageText = m.body.toLowerCase();

    // Check if any keyword is present in the message and send the corresponding audio
    for (const keyword in audioLinks) {
      if (messageText.includes(keyword)) {
        await m.React('⏳'); // Loading reaction
        const audioUrl = audioLinks[keyword];

        // Send the audio file
        await sock.sendMessage(
          m.from,
          {
            audio: { url: audioUrl },
            mimetype: 'audio/mp4',
            ptt: true,
            contextInfo: {
              mentionedJid: [m.sender],
              forwardingScore: 999,
              isForwarded: true,
            }
          },
          { quoted: m }
        );
        return; // Stop further processing if an audio is sent
      }
    }
  }

  // Existing functionality for uptime, alive, etc.
  const uptimeSeconds = process.uptime();
  const days = Math.floor(uptimeSeconds / (24 * 3600));
  const hours = Math.floor((uptimeSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeSeconds % 60);

  // Get real time
  const realTime = moment().tz("Tanzania/Dodoma").format("HH:mm:ss");
  const time2 = moment().tz("Tanzania/Dodoma").format("HH:mm:ss");
  
  let pushwish = "";

  if (time2 < "05:00:00") {
    pushwish = `Good Morning 🌄`;
  } else if (time2 < "11:00:00") {
    pushwish = `Good Morning 🌄`;
  } else if (time2 < "15:00:00") {
    pushwish = `Good Afternoon 🌅`;
  } else if (time2 < "18:00:00") {
    pushwish = `Good Evening 🌃`;
  } else {
    pushwish = `Good Night 🌌`;
  }

  const aliveMessage = `*CODES BY JOEL XMD*\n*---------------------`;

  await m.React('☄️'); // React with a success icon
  
  sock.sendMessage(
    m.from,
    {
      audio: { url: 'https://github.com/joeljamestech2/JOEL-XMD/raw/refs/heads/main/mydata/media/alive.mp3' },
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
          body: `UPTIME ${days}D ${hours}H ${minutes}M ${seconds}S`,
          thumbnailUrl: 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/alive.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    },
    { quoted: m }
  );
};

export default joel;
