import axios from 'axios';

const play = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (cmd === "play2") {
    const query = m.body.slice(prefix.length + cmd.length).trim(); // Extract song name from the message

    if (!query) {
      await sock.sendMessage(m.from, { text: '🎧 Please provide the song you want me to play! 🎶' });
      return;
    }

    await m.React('⏳'); // Loading reaction

    try {
      // Use the API to get the song details
      const apiUrl = `https://apis.davidcyriltech.my.id/play?query=${encodeURIComponent(query)}`;
      const response = await axios.get(apiUrl);

      if (!response.data || !response.data.audio_url) {
        await sock.sendMessage(m.from, { text: 'Sorry 😔, I couldn\'t find that song. Try a different query!' });
        return;
      }

      const downloadUrl = response.data.audio_url;

      // Send the audio file
      await sock.sendMessage(
        m.from,
        {
          audio: { url: downloadUrl },
          mimetype: 'audio/mp4',
          ptt: true, // Push-to-talk audio
        },
        { quoted: m }
      );

      // Success reaction and message
      await sock.sendMessage(m.from, { text: `🎶 Here you go, ${m.pushName}! Enjoy your song! 🎧💖` });
      await m.React('💃'); // Success dance emoji
    } catch (error) {
      console.error(error);
      await sock.sendMessage(m.from, { text: 'Oops! 😣 Something went wrong while fetching the song.' });
      await m.React('💔'); // Sad face reaction
    }
  }
};

export default play;
