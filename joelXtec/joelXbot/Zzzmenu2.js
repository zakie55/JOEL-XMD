import config from '../../config.cjs'; // Import the config to use the prefix from the config file

const menuCommand = async (m, sock) => {
  const prefix = config.PREFIX; // Get the prefix from the config file
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';

  // Menu Command
  if (cmd === "menu2") {
    // Define the menu image URL
    const menuImageUrl = 'https://avatars.githubusercontent.com/u/162905644?v=4';

    // Construct the menu text
    const menuText = `
*Welcome to the Bot Menu!*
Here are the commands you can use:

1. *!ping* - Check the bot's response time
2. *!joke* - Get a random joke
3. *!meme* - Receive a random meme
4. *!ringtone <text>* - Get a custom ringtone from text
5. *!help* - Show this menu again

Have fun using the bot! 😊`;

    // Send the menu message with the image and options
    await m.React('📜'); // React with a scroll emoji to indicate the menu

    sock.sendMessage(m.from, {
      image: { url: menuImageUrl }, // Menu image URL
      caption: menuText, // Text for the menu
      contextInfo: {
        isForwarded: true, // Mark as forwarded
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363317462952356@newsletter', // Replace with actual newsletter JID
          newsletterName: "ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ", // Name of your bot
          serverMessageId: -1,
        },
        forwardingScore: 999,
        externalAdReply: {
          title: "ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ ᴠ¹⁰",
          body: "Explore the commands to interact with the bot!",
          thumbnailUrl: menuImageUrl, // Use the same image URL for the thumbnail
          sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K', // Channel or bot URL
          mediaType: 1, // Set to 1 for an image
          renderLargerThumbnail: false,
        },
      },
    }, { quoted: m }); // Send the menu message with the quoted message if needed
  }
};

export default menuCommand;
