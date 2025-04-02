import config from '../../config.cjs'; // Ensure this matches your project setup

const ping = async (m, sock) => {
  try {
    const prefix = config.PREFIX;
    const cmd = m.body.startsWith(prefix)
      ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
      : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();

    if (cmd === "pong") {
      const start = new Date().getTime();
      await m.React('⏳'); // React with a loading icon
      const end = new Date().getTime();
      const responseTime = (end - start).toFixed(2);

      // Updated text style with Sarkar-MD branding and response rate
      const responseText = `*ᴘᴏɴɢ sᴘᴇᴇᴅ: ${responseTime} ms*`;

      await m.React('✅'); // React with a success icon

      await sock.sendMessage(
        m.from,
        {
          text: responseText,
          contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363317462952356@newsletter',
              newsletterName: "ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ",
              serverMessageId: -1,
            },
            forwardingScore: 999, // Score to indicate it has been forwarded
            externalAdReply: {
              title: "ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ ᴠ¹⁰",
              body: "ᴘɪɴɢ sᴘᴇᴇᴅ ᴄᴀʟᴄᴜʟᴀᴛɪᴏɴs",
              thumbnailUrl: 'https://avatars.githubusercontent.com/u/162905644?v=4', // Optional thumbnail URL
              imageUrl: 'https://yourdomain.com/path/to/owner.jpg', // Replace with your actual image URL
              sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K', // Add source URL if necessary
              mediaType: 2, // Use mediaType 2 for images
              renderLargerThumbnail: false,
            },
          },
        },
        { quoted: m }
      );
    }
  } catch (error) {
    console.error("Error handling ping command:", error);
    await m.React('❌'); // React with an error icon
    sock.sendMessage(
      m.from,
      { text: "Something went wrong while processing the ping command." },
      { quoted: m }
    );
  }
};

export default ping;
