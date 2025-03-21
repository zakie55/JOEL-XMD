
import config from '../../config.cjs';

const ownerContact = async (m, gss) => {
    const ownernumber = config.OWNER_NUMBER;
    const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

// Helper function to send messages with context
const sendContact = async (m, sock, messageContent) => {
  await sock.sendMessage(
    m.from,
    {
      text: messageContent,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363315182578784@newsletter',
          newsletterName: "Sarkar-MD",
          serverMessageId: -1,
        },
        externalAdReply: {
          title: "✨ Sarkar-MD ✨",
          body: m.pushName || "User",
          thumbnailUrl: 'https://raw.githubusercontent.com/Sarkar-Bandaheali/BALOCH-MD_DATABASE/refs/heads/main/Pairing/1733805817658.webp',
          sourceUrl: 'https://github.com/Sarkar-Bandaheali/Sarkar-MD',
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    },
    { quoted: m }
  );
};
//let's add Joel cmd
    if (cmd === 'joe') {
        try {
            await gss.sendContact(m.from, [ownernumber], m);
            await m.React("✅");
        } catch (error) {
            console.error('Error sending owner contact:', error);
            m.reply('Error sending owner contact.');
            await m.React("❌");
        }
    }
};

export default ownerContact;
