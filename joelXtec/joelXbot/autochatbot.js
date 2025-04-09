

import config from '../../config.cjs';

const autotypingCommand = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === 'chatbot') {
    if (!isCreator) return m.reply("*ᴏᴡɴᴇʀ ᴄᴏᴍᴍᴀɴᴅ ᴍᴀᴅᴀғᴀᴋᴇʀ*");
    let responseMessage;

    if (text === 'on') {
      config.CHAT_BOT = true;
      responseMessage = "chatbot has been enabled.";
    } else if (text === 'off') {
      config.CHAT_BOT = false;
      responseMessage = "chatbot has been disabled.";
    } else {
      responseMessage = "Usage:\n- `chatbot on`: Enable Auto-chatbot\n- `chatbot  off`: Disable Auto-chat bot";
    }

    try {
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error processing your request:", error);
      await Matrix.sendMessage(m.from, { text: 'Error processing your request.' }, { quoted: m });
    }
  }
};

export default autotypingCommand;
