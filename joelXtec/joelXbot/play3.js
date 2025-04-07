import axios from 'axios';

const song = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (cmd === "song2") {
    const query = m.body.slice(prefix.length + cmd.length).trim(); // Extract query from the message

    if (!query) {
      await sock.sendMessage(m.from, { text: '🎶 Please give me a song name to play! 🎧' });
      return;
    }

    await m.React('⏳'); // Loading reaction

    // Use a YouTube search API or any third-party service to get the video URL
    const searchUrl = `https://apis.davidcyriltech.my.id/play?query=${encodeURIComponent(query)}`;
    try {
      // Fetch search results
      const searchResponse = await axios.get(searchUrl);
      const firstResult = searchResponse.data[0];

      if (!firstResult) {
        await sock.sendMessage(m.from, { text: 'Oops! 😿 I couldn\'t find that song, try another one!' });
        return;
      }

      const videoUrl = video_url;
      const apiUrl = `https://api.davidcyriltech.my.id/download/ytmp3?url=${videoUrl}`;

      // Download the audio
      const downloadResponse = await axios.get(apiUrl);
      const downloadUrl = downloadResponse.data.download_url;

      // Send the audio file with newsletter info and reactions
      await sock.sendMessage(
        m.from,
        {
          audio: { url: downloadUrl },
          mimetype: 'audio/mp4',
          ptt: true, // Push-to-talk audio
          contextInfo: { 
            mentionedJid: [m.sender], 
            forwardingScore: 999, 
            isForwarded: true, 
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363317462952356@newsletter', // Replace with your newsletter JID
              newsletterName: 'ᴊᴏᴇʟ xᴅ ʙᴏᴛ ᴠ ⁷', // Newsletter name
              serverMessageId: 143, // Server message ID (could be dynamic if needed)
            },
            externalAdReply: {
              title: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ", // Ad title
              body: 'Enjoy listening to your favorite music 🎶', // Ad body
              thumbnailUrl: 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/alive.jpg', // Thumbnail image URL
              sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K', // Source URL (could be the link to a channel or website)
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: m }
      );

      // Success reaction
      await sock.sendMessage(m.from, { text: `🎶 I found your song! Enjoy listening to it, ${m.pushName}! 💖` });
      await m.React('💃'); // Cute dancing emoji reaction
    } catch (error) {
      console.error(error);
      await sock.sendMessage(m.from, { text: 'Oopsie! 😣 Something went wrong. I couldn\'t fetch the song, please try again later!' });
      await m.React('💔'); // Sad face reaction
    }
  }
};

export default song;
