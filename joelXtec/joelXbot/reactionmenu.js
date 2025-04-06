import config from '../../config.cjs';

const menuCmd = async (m, sock) => {
  const prefix = config.PREFIX;
  const pushName = m.pushName || 'User';
  const messageContent = m.text.toLowerCase(); // Get the message content in lowercase to check for commands

  // Check if the command is valid (reactionmenu, reaction, or rmenu)
  if (['reactionmenu', 'reaction', 'rmenu'].includes(messageContent.replace(prefix, '').trim())) {
    const menuText = `
    *Welcome, ${pushName}! Here are the available commands:*

    *Reactions Commands:*
    1. ${prefix}bully - 👊
    2. ${prefix}cuddle - 🤗
    3. ${prefix}cry - 😢
    4. ${prefix}hug - 😊
    5. ${prefix}awoo - 🐺
    6. ${prefix}kiss - 😘
    7. ${prefix}lick - 👅
    8. ${prefix}pat - 👋
    9. ${prefix}smug - 😏
    10. ${prefix}bonk - 🔨
    11. ${prefix}yeet - 🚀
    12. ${prefix}blush - 😊
    13. ${prefix}smile - 😄
    14. ${prefix}wave - 👋
    15. ${prefix}highfive
    16. ${prefix}handhold
    17. ${prefix}nom - 👅
    18. ${prefix}bite - 🦷
    19. ${prefix}glomp - 🤗
    20. ${prefix}slap - 👋
    21. ${prefix}kill - 💀
    22. ${prefix}kick - 🦵
    23. ${prefix}happy - 😄
    24. ${prefix}wink - 😉
    25. ${prefix}poke - 👉
    26. ${prefix}dance - 💃
    27. ${prefix}cringe - 😬

    *Usage Tips:*
    - Just type the command and the bot will send the corresponding reaction video.
    - For example, typing *${prefix}hug* will send a hug reaction video along with the emoji 😊.

    *Need help or more info?* You can always ask me by typing *${prefix}help*.
    `;

    const messagePayload = {
      text: menuText,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363317462952356@newsletter',
          newsletterName: "ᴊᴏᴇʟ xᴅ ʙᴏᴛ",
          serverMessageId: -1,
        },
        externalAdReply: {
          title: "ᴊᴏᴇʟ xᴅ ʙᴏᴛ",
          body: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ",
          thumbnailUrl:
            'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/joelXbot.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
          mediaType: 1,
          renderLargerThumbnail: false,
        },
      },
    };

    try {
      // Send the menu text as a message
      await sock.sendMessage(m.from, messagePayload, { quoted: m });
    } catch (error) {
      console.error('Error sending menu:', error);
      await sock.sendMessage(m.from, { text: '⚠️ An error occurred while sending the menu. Please try again later!' });
    }
  }
};

export default menuCmd;
