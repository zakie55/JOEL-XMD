
import axios from 'axios';
import config from '../../config.cjs';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const imageCommand = async (m, sock) => {
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const query = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['help', 'commands', 'm'];

  if (validCommands.includes(cmd)) {
  
    if (!query && !(m.quoted && m.quoted.text)) {
      return sock.sendMessage(m.from, { text: `Please provide some text, Example usage: ${prefix + cmd} black cats` });
    }
  
    if (!query && m.quoted && m.quoted.text) {
      query = m.quoted.text;
    }

    const numberOfImages = 5; 

    try {
      await sock.sendMessage(m.from, { text: '*Please wait*' });

      const images = [];

      for (let i = 0; i < numberOfImages; i++) {
        const endpoint = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(endpoint, { responseType: 'arraybuffer' });

        if (response.status === 200) {
          const imageBuffer = Buffer.from(response.data, 'binary');
          images.push(imageBuffer);
        } else {
          throw new Error('Image generation failed');
        }
      }

      for (let i = 0; i < images.length; i++) {
        await sleep(500);
        await sock.sendMessage(m.from, { image: images[i], caption: '*❑━❒вσт ιηƒσямαтιση❑━❒*\n- вσт ηαмє: ʝσєℓ-χ∂-ν3\n- νєяѕιση 6.0.0\n- σωηєя: ℓσя∂ ʝσєℓ\n- ѕтαтυѕ :вσт ιѕ σηℓιηє\n- ρℓαтƒσям: ℓιηυχ\n- мσ∂є: ρυвℓι¢\n- ρяєƒιχ (.)\n- тнємє: ʝσєℓ тє¢н\n- ℓιвяαяу: вαιℓωαуѕ\n*❑━❒ʝσєℓ χ∂ ν тняєє❑━❒*' }, { quoted: m });
      }
      await m.React("✅");
    } catch (error) {
      console.error("Error fetching images:", error);
      await sock.sendMessage(m.from, { text: '*Oops! Something went wrong while generating images. Please try again later.*' });
    }
  }
};

export default imageCommand;
