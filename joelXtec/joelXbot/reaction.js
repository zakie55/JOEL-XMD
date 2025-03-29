import axios from 'axios';
import config from '../../config.cjs';

const stickerCommandHandler = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.trim().startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const gifCommands = ['cry', 'kiss', 'kill', 'kick', 'hug', 'pat', 'lick', 'bite', 'yeet', 'bully', 'bonk', 'wink', 'poke', 'nom', 'slap', 'smile', 'wave', 'awoo', 'blush', 'smug', 'dance', 'happy', 'sad', 'cringe', 'cuddle', 'shinobu', 'handhold', 'glomp', 'highfive'];

  if (gifCommands.includes(cmd)) {
    const apiKey = 'YOUR_GIPHY_API_KEY'; // Replace with your Giphy API key
    const packname = `jᴏᴇʟ xᴍᴅ`;
    const author = 'ʙᴏᴛ';

    try {
      const { data } = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
        params: {
          api_key: apiKey,
          q: cmd,
          limit: 1,
          rating: 'pg-13', // Adjust rating if necessary
        },
      });

      if (data && data.data.length > 0) {
        const gifUrl = data.data[0].images.original.url;
        await gss.sendImage(m.from, gifUrl, m, { caption: `Here’s a ${cmd} gif!` });
      } else {
        m.reply('Error: No GIF found.');
      }
    } catch (error) {
      console.error('Error fetching GIF:', error.message || error);
      m.reply('An error occurred while fetching the GIF. Please try again later.');
    }
  } else {
    m.reply('Unknown GIF command.');
  }
};

export default stickerCommandHandler;
