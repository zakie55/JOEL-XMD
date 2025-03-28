import axios from 'axios';
import config from '../../config.cjs';

const botCommands = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const validCommands = ['waifu', 'neko', 'shinobu', 'megumin', 'coupledp'];

  // Cool fonts (example: simple Unicode styling)
  const coolFontCaption = `*ᴊᴏᴇʟ  xᴍᴅ ʙᴏᴛ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ*`;

  if (validCommands.includes(cmd)) {
    if (cmd === 'waifu') {
      const waifuUrl = 'https://api.waifu.pics/sfw/waifu'; // Endpoint to fetch waifu image

      await m.React('⏳'); // React with a loading icon
      try {
        const response = await axios.get(waifuUrl);
        if (response.data && response.data.url) {
          await gss.sendMessage(
            m.from,
            {
              image: { url: response.data.url },
              caption: 'Here is your waifu image!',
            },
            { quoted: m }
          );
        } else {
          await gss.sendMessage(m.from, "Sorry, I couldn't fetch the waifu image. Please try again later.", { quoted: m });
        }
      } catch (error) {
        console.error("Error fetching waifu image:", error);
        await gss.sendMessage(m.from, "Something went wrong while fetching the waifu image. Please try again later.", { quoted: m });
      }
    } else if (cmd === 'neko') {
      const nekoUrl = 'https://api.waifu.pics/sfw/neko'; // Endpoint to fetch neko image

      await m.React('⏳'); // React with a loading icon
      try {
        const response = await axios.get(nekoUrl);
        if (response.data && response.data.url) {
          await gss.sendMessage(
            m.from,
            {
              image: { url: response.data.url },
              caption: 'Here is your neko image!',
            },
            { quoted: m }
          );
        } else {
          await gss.sendMessage(m.from, "Sorry, I couldn't fetch the neko image. Please try again later.", { quoted: m });
        }
      } catch (error) {
        console.error("Error fetching neko image:", error);
        await gss.sendMessage(m.from, "Something went wrong while fetching the neko image. Please try again later.", { quoted: m });
      }
    } else if (cmd === 'shinobu') {
      const shinobuUrl = 'https://api.waifu.pics/sfw/shinobu'; // Endpoint to fetch shinobu image

      await m.React('⏳'); // React with a loading icon
      try {
        const response = await axios.get(shinobuUrl);
        if (response.data && response.data.url) {
          await gss.sendMessage(
            m.from,
            {
              image: { url: response.data.url },
              caption: 'Here is your Shinobu image!',
            },
            { quoted: m }
          );
        } else {
          await gss.sendMessage(m.from, "Sorry, I couldn't fetch the Shinobu image. Please try again later.", { quoted: m });
        }
      } catch (error) {
        console.error("Error fetching Shinobu image:", error);
        await gss.sendMessage(m.from, "Something went wrong while fetching the Shinobu image. Please try again later.", { quoted: m });
      }
    } else if (cmd === 'megumin') {
      const meguminUrl = 'https://api.waifu.pics/sfw/megumin'; // Endpoint to fetch megumin image

      await m.React('⏳'); // React with a loading icon
      try {
        const response = await axios.get(meguminUrl);
        if (response.data && response.data.url) {
          await gss.sendMessage(
            m.from,
            {
              image: { url: response.data.url },
              caption: 'Here is your Megumin image!',
            },
            { quoted: m }
          );
        } else {
          await gss.sendMessage(m.from, "Sorry, I couldn't fetch the Megumin image. Please try again later.", { quoted: m });
        }
      } catch (error) {
        console.error("Error fetching Megumin image:", error);
        await gss.sendMessage(m.from, "Something went wrong while fetching the Megumin image. Please try again later.", { quoted: m });
      }
    } else if (cmd === 'coupledp') {
      const coupledpUrl = 'https://fantox-cosplay-api.onrender.com/'; // Endpoint to fetch couple dp image

      await m.React('⏳'); // React with a loading icon
      try {
        const response = await axios.get(coupledpUrl);
        if (response.data && response.data.image) {
          await gss.sendMessage(
            m.from,
            {
              image: { url: response.data.image },
              caption: coolFontCaption, // Apply the cool font here
            },
            { quoted: m }
          );
        } else {
          await gss.sendMessage(m.from, "Sorry, I couldn't fetch a couple dp image. Please try again later.", { quoted: m });
        }
      } catch (error) {
        console.error("Error fetching couple dp image:", error);
        await gss.sendMessage(m.from, "Something went wrong while fetching the couple dp image. Please try again later.", { quoted: m });
      }
    }
  }
};
// lord joel xmd bot 
export default botCommands;
