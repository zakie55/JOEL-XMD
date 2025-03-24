import axios from 'axios';
import config from '../../config.cjs';

const nudeCommands = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const validCommands = ['nude', 'nudeimage', 'nudeimg'];

  if (validCommands.includes(cmd)) {
    // API URL for the image request
    const nudeUrl = `https://pikabotzapi.vercel.app/anime-nsfw/hentai-images/?apikey=anya-md&category=nude`;

    try {
      await m.React('⏳'); // React with a loading icon
      const response = await axios.get(nudeUrl);

      if (response.data && response.data.url) {
        // Check if the response contains the image URL
        await gss.sendMessage(
          m.from,
          {
            image: { url: response.data.url },
            caption: `*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ*`,
          },
          { quoted: m }
        );
      } else {
        // Handle case where the API doesn't return a valid URL
        await gss.sendMessage(m.from, 'Sorry, no image found at the moment.');
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      await gss.sendMessage(m.from, 'Something went wrong while fetching the image.');
    }
  }
};

export default nudeCommands;
