import moment from 'moment-timezone';
import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import fetch from 'node-fetch';
import config from '../../config.cjs';

const OthersCmd = async (m, sock) => {
  const prefix = config.PREFIX;
  const mode = config.MODE;
  const pushName = m.pushName || 'User';

  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';

    // Random quotes list
  const quotes = [
    "Believe you can and you're halfway there.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "The only way to do great work is to love what you do.",
    "Dream big and dare to fail.",
    "Don't watch the clock; do what it does. Keep going.",
    "Act as if what you do makes a difference. It does.",
    "Start where you are. Use what you have. Do what you can.",
    "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    "You miss 100% of the shots you don't take.",
    "The best time to plant a tree was 20 years ago. The second best time is now."
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  // Common function to send message with newsletterJid and externalAdReply
  const sendCommandMessage = async (messageContent) => {
    await sock.sendMessage(
      m.from,
      {
        text: messageContent,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363317462952356@newsletter', // Preserved newsletter JID
            newsletterName: "ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ",
            serverMessageId: -1,
          },
          externalAdReply: {
            title: "ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ ",
            body: pushName,
            thumbnailUrl: 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/settings.jpg', // Thumbnail URL
            sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K', // Source URL
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
  };
  // Command: ping
if (cmd === "speed") {
    await m.React('⏳'); // React with a loading icon
    const start = new Date().getTime();
    await m.React('⏳'); // React with a loading icon
    const end = new Date().getTime();
    const responseTime = (end - start).toFixed(2);
    
    const responseText = `* pong ${responseTime} ms`;

    await m.React('✅'); // React with success icon
    await sendCommandMessage(responseText);
}

//alive msg
  if (cmd === "i") {
    await m.React('⏳'); // React with a loading icon

    const aliveMessage = `
╭───────────────━⊷
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

await m.React('✅'); // React with success icon
    await sendCommandMessage(aliveMessage);
  }
 
 
  if (cmd === "") {
    await m.React('⏳'); // React with a loading icon

    const aboutMessage = `
╭───────────────━⊷
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
 *ᴍᴀᴅᴇ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ*
`;
await m.React('✅'); // React with success icon
    await sendCommandMessage(aboutMessage);
  }
  // Vcard 
  
 
//script ya sc 

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
// joel james tech info
export default OthersCmd;
