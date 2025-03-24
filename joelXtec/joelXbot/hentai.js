


import axios from 'axios';
import config from '../../config.cjs';

const nudeCommands = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const validCommands = ['nude', 'nudeimage', 'nudeimg'];

  if (validCommands.includes(cmd)) {
     // URL de l'API pour obtenir l'image de la catégorie "kissing_while_penetrated"
        const apiUrl = 'https://pikabotzapi.vercel.app/anime-nsfw/hentai-images/?apikey=anya-md&category=kissing_while_penetrated';

        // Faire une requête à l'API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Vérification des données reçues
        if (data && data.image) {
            const nudeUrl = data.image; // URL de l'image reçue depuis l'API
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
  
