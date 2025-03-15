import fetch from 'node-fetch';
import config from '../../config.cjs';

const aiChatCommand = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === 'ai') {
    if (!text) return m.reply("⚠️ Usage: *ai <your question>*");

    let apiKey = "YOUR_OPENAI_API_KEY";  
    let apiUrl = "https://api.openai.com/v1/chat/completions";

    try {
      let response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: text }]
        })
      });

      let data = await response.json();
      if (!data.choices || data.choices.length === 0) return m.reply("❌ AI response error.");

      await Matrix.sendMessage(m.from, { text: `🤖 AI: ${data.choices[0].message.content}` }, { quoted: m });
    } catch (error) {
      console.error("AI Chat Error:", error);
      await Matrix.sendMessage(m.from, { text: "❌ Error connecting to AI." }, { quoted: m });
    }
  }
};

export default aiChatCommand;
