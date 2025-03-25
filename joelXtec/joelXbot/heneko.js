import axios from 'axios';
import config from '../../config.cjs';  // Your bot configuration

// Helper function to fetch and send an image
const sendImage = async (m, sock, imageUrl, caption) => {
  try {
    await sock.sendMessage(m.from, {
      image: { url: imageUrl },
      caption: caption,
    });
    await m.React('✅');  // React with a success icon
  } catch (error) {
    console.error(error);
    await sock.sendMessage(m.from, {
      text: 'Sorry, something went wrong while fetching the image!',
    });
  }
};

const getNsfwImage = async (m, sock) => {
  const prefix = config.PREFIX;

  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';

  // Check if it's a valid command
  if (cmd === 'hwaifu' || cmd === 'trap') {
    await m.React('💬');  // React with a loading icon

    const endpoint = cmd === 'hwaifu' ? 'nsfw/waifu' : 'nsfw/trap';
    
    try {
      // Fetch random NSFW image from the waifu.pics API
      const response = await axios.get(`https://api.waifu.pics/${endpoint}`);
      const imageUrl = response.data.url;  // Extract the image URL

      // Send the image
      const caption = cmd === 'hwaifu'
        ? 'Here is your random NSFW Waifu image!'
        : 'Here is your random NSFW Trap image!';

      await sendImage(m, sock, imageUrl, caption);

    } catch (error) {
      console.error(error);
      await sock.sendMessage(m.from, {
        text: 'Sorry, something went wrong while fetching the image!',
      });
    }
  }
};

export default getNsfwImage;
