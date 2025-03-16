import moment from 'moment-timezone';
import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import config from '../../config.cjs';

const joelCmd = async (m, sock) => {
  const prefix = config.PREFIX;
  const mode = config.MODE;
  const pushName = m.pushName || 'User';

  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';
    
        // Calculate uptime
    const uptimeSeconds = process.uptime();
    const days = Math.floor(uptimeSeconds / (24 * 3600));
    const hours = Math.floor((uptimeSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeSeconds % 60);
    //realtime function
        const realTime = moment().tz("Asia/Karachi").format("HH:mm:ss");
// pushwish function
    let pushwish = "";
    
        if (realTime < "05:00:00") {
  pushwish = `𝙶𝙾𝙾𝙳 𝙼𝙾𝚁𝙽𝙸𝙽𝙶 🌄`;
} else if (realTime < "11:00:00") {
  pushwish = `𝙶𝙾𝙾𝙳 𝙼𝙾𝚁𝙽𝙸𝙽𝙶 🌄`;
} else if (realTime < "15:00:00") {
  pushwish = `𝙶𝙾𝙾𝙳 𝙰𝙵𝚃𝙴𝚁𝙽𝙾𝙾𝙽 🌅`;
} else if (realTime < "18:00:00") {
  pushwish = `𝙶𝙾𝙾𝙳 𝙴𝚅𝙴𝙽𝙸𝙽𝙶 🌃`;
} else if (realTime < "19:00:00") {
  pushwish = `𝙶𝙾𝙾𝙳 𝙴𝚅𝙴𝙽𝙸𝙽𝙶 🌃`;
} else {
  pushwish = `𝙶𝙾𝙾𝙳 𝙽𝙸𝙶𝙷𝚃 🌌`;
}

  const sendCommandMessage = async (messageContent) => {
    await sock.sendMessage(
      m.from,
      {
        text: messageContent,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '@newsletter', // Preserved newsletter JID
            newsletterName: "",
            serverMessageId: -1,
          },
          externalAdReply: {
            title: "",
            body: pushName,
            thumbnailUrl: '', // Thumbnail URL
            sourceUrl: '', // Source URL
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
  };

 if (cmd === "script" || cmd === "sc" || cmd === "repo") {
    await m.React('⏳'); // Loading reaction

    const owner = "joeljamestech2";
    const repo = "JOEL-XMD";

    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        const data = await response.json();

        if (!data.stargazers_count) throw new Error("Invalid Repo or API Limit!");

        const statsMessage = `╭───────────────━⊷
║ ᴊᴏᴇʟ-xᴍᴅ ᴍᴀɪɴ ʀᴇᴘᴏ
╰───────────────━⊷
╭───────────────━⊷
║💡 *ɴᴀᴍᴇ:* ᴊᴏᴇʟ-xᴍᴅ
║⭐ *ᴛᴏᴛᴀʟ sᴛᴀʀs:*  ${data.stargazers_count}  
║🍴 *ᴛᴏᴛᴀʟ ғᴏʀᴋs:*   ${data.forks_count}  
║👀 *ᴡᴀᴛᴄʜᴇʀs:*  ${data.watchers_count}  
║❗ *ᴏᴘᴇɴ ɪssᴜᴇs:* 2
║👤 *ᴏᴡɴᴇʀ:* ʟᴏʀᴅ ᴊᴏᴇʟ
╰───────────────━⊷
╭───────────────━⊷
║ sᴛᴀʀ ᴛʜᴇɴ ғᴏʀᴋ ᴍʏ ʀᴇᴘᴏ
║ ʀᴇᴘᴏ ʟɪɴᴋ: https://shorturl.at/MV98C
╰───────────────━⊷
 *ᴍᴀᴅᴇ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ xᴍᴅ*`;

        await m.React('✅'); // Success reaction
        await sendCommandMessage(statsMessage);

    } catch (error) {
        await m.React('❌'); // Error reaction
        await sendCommandMessage("❌ *Error fetching GitHub data!*");
    }
}
};
//lord joel 
export default joelCmd;
