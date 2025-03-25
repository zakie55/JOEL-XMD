import axios from 'axios';
import config from '../../config.cjs';  // Your bot configuration

const getNsfwImage = async (m, sock) => {
  const prefix = config.PREFIX;

  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';

  // Command to fetch NSFW Waifu image
  if (cmd === 'hwaifu') {
    // Make sure this is only used in NSFW channels or with proper warnings
    if (!m.isGroup || !m.isNsfw) {
      await sock.sendMessage(m.from, { text: 'This command can only be used in NSFW chats!' });
      return;
    }

    await m.React('💬');  // React with a loading icon

    try {
      // Fetch a random NSFW waifu image from the waifu.pics API
      const response = await axios.get('https://api.waifu.pics/nsfw/waifu');

      const imageUrl = response.data.url;  // Extract the image URL

      // Send the image URL as a message
      await sock.sendMessage(m.from, {
        image: { url: imageUrl },
        caption: 'Here is your random NSFW Waifu image!',
      });

      await m.React('✅');  // React with a success icon

    } catch (error) {
      console.error(error);
      await sock.sendMessage(m.from, {
        text: 'Sorry, something went wrong while fetching the image!',
      });
    }
  }

  // Command to fetch NSFW Trap image
  if (cmd === 'trap') {
    // Make sure this is only used in NSFW channels or with proper warnings
    if (!m.isGroup || !m.isNsfw) {
      await sock.sendMessage(m.from, { text: 'This command can only be used in NSFW chats!' });
      return;
    }

    await m.React('💬');  // React with a loading icon

    try {
      // Fetch a random NSFW trap image from the waifu.pics API
      const response = await axios.get('https://api.waifu.pics/nsfw/trap');

      const imageUrl = response.data.url;  // Extract the image URL

      // Send the image URL as a message
      await sock.sendMessage(m.from, {
        image: { url: imageUrl },
        caption: 'Here is your random NSFW Trap image!',
      });

      await m.React('✅');  // React with a success icon

    } catch (error) {
      console.error(error);
      await sock.sendMessage(m.from, {
        text: 'Sorry, something went wrong while fetching the image!',
      });
    }
  }
};

export default getNsfwImage;
