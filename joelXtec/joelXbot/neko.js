import axios from 'axios';
import config from '../../config.cjs';

const nekoImage = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const validCommands = ['neko', 'n', 'nk'];

  if (validCommands.includes(cmd)) {
    const imageUrl = `https://files.catbox.moe/6o2lv6.jpg`;
await m.React('⏳'); // React with a loading icon
    await gss.sendMessage(
      m.from,
      {
        image: { url: imageUrl },
        caption: `
*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ  ᴊᴏᴇʟ*
xxxxxxxxxxxxxx xxxxxxx`,
      },
      { quoted: m }
    );
  }
};
//codes by lord joel 
export default nekoImage;
    
