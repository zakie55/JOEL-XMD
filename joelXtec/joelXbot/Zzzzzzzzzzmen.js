import { prepareWAMessageMedia } from '@whiskeysockets/baileys';
import config from '../../config.cjs';

// This function sends a menu message with available commands and a video URL
const menuCmd = async (m, sock) => {
  const prefix = config.PREFIX;
  const pushName = m.pushName || 'User';

  // Message for the available commands
  const menuMessage = `*Hello ${pushName}, here are the available commands:*
  \n1. *${prefix}uptime* - Shows bot uptime
  \n2. *${prefix}alive* - Check if the bot is alive
  \n3. *${prefix}runtime* - Shows runtime of the bot
  \n4. *${prefix}help* - Displays this menu
  \n5. *${prefix}othercommand* - Another available feature (you can add more)

  *Powered by JOEL XMD Bot*

  *Watch this video for more info:*
  https://bk9.fun/Islam/quranvid`;

  // Prepare the video message
  const videoMessage = {
    video: { url: 'https://bk9.fun/Islam/quranvid' },
    mimetype: 'video/mp4',  // Assuming the video is in mp4 format
    caption: "Watch this video for more details."
  };

  // Send the video followed by the menu text message
  await sock.sendMessage(m.from, videoMessage, { quoted: m });
  await sock.sendMessage(m.from, { text: menuMessage }, { quoted: m });
};

const helpCmd = async (m, sock) => {
  // Display the same menu for 'help' command
  await menuCmd(m, sock);
};

const handleCommands = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (cmd === 'menu' || cmd === 'help') {
    // Call the appropriate function for 'menu' and 'help' commands
    await menuCmd(m, sock); // You can also use helpCmd(m, sock) if you want a separate handler
  }

  // Add more command handlers here if needed
};

export default handleCommands;
