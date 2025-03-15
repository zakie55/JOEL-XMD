import fetch from 'node-fetch';
import config from '../config.cjs';

const weathercommand = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const city = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === 'weather') {
    if (!city) return m.reply("⚠️ Please provide a city name.\nUsage: `weather Nairobi`");

    const apiKey = "YOUR_OPENWEATHER_API_KEY";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) return m.reply("❌ City not found!");

      const weatherText = `🌍 *Weather in ${data.name}, ${data.sys.country}*  
      🌡️ Temp: ${data.main.temp}°C  
      ☁️ Condition: ${data.weather[0].description}`;

      await Matrix.sendMessage(m.from, { text: weatherText }, { quoted: m });
    } catch (error) {
      console.error("Weather API Error:", error);
      await Matrix.sendMessage(m.from, { text: 'Error retrieving weather data.' }, { quoted: m });
    }
  }
};

export default weathercommand;
