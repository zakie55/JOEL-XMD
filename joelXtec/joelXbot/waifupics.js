import { getWaifuImage } from './mydata/waifupics.js'; // Import the getWaifuImage function

// Example of the bot's command handler
const commandHandler = async (m, sock) => {
  const cmd = m.body.split(' ')[0].toLowerCase();

  // Waifu Image Command
  if (cmd === '!waifu') {
    try {
      const waifuImageUrl = await getWaifuImage();
      if (waifuImageUrl) {
        await sock.sendMessage(m.from, { image: { url: waifuImageUrl }, caption: 'Here is your waifu!' });
      } else {
        await sock.sendMessage(m.from, { text: 'Sorry, I couldn’t fetch a waifu image at the moment.' });
      }
    } catch (error) {
      console.error('Error in !waifu command:', error);
      await sock.sendMessage(m.from, { text: 'An error occurred while trying to fetch a waifu image.' });
    }
  }

  // Other bot commands...
};
// lord joel 
export default commandHandler;
