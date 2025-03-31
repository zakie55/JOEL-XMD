import axios from 'axios'; // Ensure axios is imported
import config from '../../config.cjs'; // Import the config to use the prefix from the config file

const memeCommand = async (m, sock) => {
  const prefix = config.PREFIX; // Get the prefix from the config file
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';
  
  // Meme Command
  if (cmd === "meme") {
    try {
      // Fetch a random meme from Meme API
      const response = await axios.get("https://meme-api.com/gimme");
      const meme = response.data;

      // Extract the meme's URL and title
      const memeUrl = meme.url;
      const memeTitle = meme.title;

      // Send the meme image to the user with a caption and forwarded newsletter info
      await m.React('😂'); // React with a laughing emoji or any other emoji you like

      sock.sendMessage(m.from, {
        image: { url: memeUrl }, // Send the image from the meme URL
        caption: `*Meme:* ${memeTitle}`, // Caption the meme with its title
        contextInfo: {
          isForwarded: true, // Mark the message as forwarded
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363317462952356@newsletter', // The newsletter JID, replace with the actual JID
            newsletterName: "ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ", // The name of the newsletter
            serverMessageId: -1, // Server message ID, -1 means it's a forwarded message
          },
          forwardingScore: 999, // Score to indicate it has been forwarded
          externalAdReply: {
            title: "ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ ᴠ¹⁰", // Title for the forwarded message
            body: "Hᴇʀᴇ'ʀᴇ ᴀ ᴍᴇᴍᴇ ᴛᴏ ᴄʜᴇᴄᴋ ᴏᴜᴛ", // Body of the forwarded message
            thumbnailUrl: 'https://avatars.githubusercontent.com/u/162905644?v=4', // Add thumbnail URL if required
            sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K', // Source URL if necessary
            mediaType: 1, // Set to 1 to indicate an image
            renderLargerThumbnail: false, // Whether to render a larger thumbnail
          },
        },
      }, { quoted: m }); // Send the meme image message

    } catch (error) {
      console.error("Error fetching meme:", error);

      // Send an error message if something goes wrong with fetching the meme
      sock.sendMessage(m.from, {
        text: "Oops! Something went wrong while fetching a meme. Please try again later.",
      }, { quoted: m });
    }
  }
};

export default memeCommand;
