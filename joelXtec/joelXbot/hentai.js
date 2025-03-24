import axios from 'axios';
import config from '../../config.cjs';

const nudeCommands = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const validCommands = ['nude', 'nudeimage', 'nudeimg'];

  if (validCommands.includes(cmd)) {
    const nudeUrl = `https://pikabotzapi.vercel.app/anime-nsfw/hentai-images/?apikey=anya-md&category=nude`;
await m.React('⏳'); // React with a loading icon
    await gss.sendMessage(
      m.from,
      {
        image: { url: nudeUrl },
        caption: `*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ  ᴊᴏᴇʟ*`,
      },
      { quoted: m }
    );
  }
};

export default nudeCommands;
