import config from '../../config.cjs'; // Ensure this matches your project setup

const ping = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "ping") {
    const start = new Date().getTime();
    await m.React('🏓'); // React with a loading icon
    const end = new Date().getTime();
    const responseTime = (end - start).toFixed(2);

    // Updated text style with JOEL-XMD branding and response rate
    const responseText = `*pong! response speed ${responseTime} ms🏓*`;
p
    await m.React('⚡'); // React with a success icon

    sock.sendMessage(
      m.from,
      {
        text: responseText,
        contextInfo: {
          isForwarded: false,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363317462952356@newsletter',
            newsletterName: "ᴊᴏᴇʟ xᴅ ᴠ⁷",
            serverMessageId: -1,
          },
          forwardingScore: 999, // Score to indicate it has been forwarded
          externalAdReply: {
            title: "ᴊᴏᴇʟ xᴅ ᴠ⁷ ᴍᴀɪɴ ᴘɪɴɢ",
            body: "яєѕρση∂ ѕρєє∂ χ",
            thumbnailUrl: '', // Add thumbnail URL if required
            sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K', // Add source URL if necessary
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        },
      },
      { quoted: m }
    );
  }
};

export default ping;
