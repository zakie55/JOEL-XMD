/*

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
*/


import config from '../../config.cjs';

const autotypingCommand = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  // Command processing
  if (cmd === 'chatbot') {
    if (!isCreator) return m.reply("*ᴏᴡɴᴇʀ ᴄᴏᴍᴍᴀɴᴅ ᴍᴀᴅᴀғᴀᴋᴇʀ*");
    
    let responseMessage;

    if (text === 'on') {
      config.CHAT_BOT = true;
      responseMessage = "Chatbot has been enabled.";
    } else if (text === 'off') {
      config.CHAT_BOT = false;
      responseMessage = "Chatbot has been disabled.";
    } else {
      responseMessage = "Usage:\n- `chatbot on`: Enable Auto-chatbot\n- `chatbot off`: Disable Auto-chatbot";
    }

    try {
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error processing your request:", error);
      await Matrix.sendMessage(m.from, { text: 'Error processing your request.' }, { quoted: m });
    }
  }

  // Handle 'lydea' command
  else if (cmd === 'lydea') {
    if (!isCreator) return m.reply("*ᴏᴡɴᴇʀ ᴄᴏᴍᴍᴀɴᴅ ᴍᴀᴅᴀғᴀᴋᴇʀ*");
    // Custom handling for 'lydea'
    await Matrix.sendMessage(m.from, { text: "Lydea command activated!" }, { quoted: m });
  }

  // Handle 'lydia' command
  else if (cmd === 'lydia') {
    if (!isCreator) return m.reply("*ᴏᴡɴᴇʀ ᴄᴏᴍᴍᴀɴᴅ ᴍᴀᴅᴀғᴀᴋᴇʀ*");
    // Custom handling for 'lydia'
    await Matrix.sendMessage(m.from, { text: "Lydia command activated!" }, { quoted: m });
  }

  // Handle 'bot' command
  else if (cmd === 'bot') {
    if (!isCreator) return m.reply("*ᴏᴡɴᴇʀ ᴄᴏᴍᴍᴀɴᴅ ᴍᴀᴅᴀғᴀᴋᴇʀ*");
    // Custom handling for 'bot'
    await Matrix.sendMessage(m.from, { text: "Bot command activated!" }, { quoted: m });
  }

  // Handle 'automreply' command (first occurrence)
  else if (cmd === 'automreply') {
    if (!isCreator) return m.reply("*ᴏᴡɴᴇʀ ᴄᴏᴍᴍᴀɴᴅ ᴍᴀᴅᴀғᴀᴋᴇʀ*");
    
    let responseMessage;
    
    if (text === 'on') {
      config.AUTO_REPLY = true;
      responseMessage = "Auto-reply has been enabled.";
    } else if (text === 'off') {
      config.AUTO_REPLY = false;
      responseMessage = "Auto-reply has been disabled.";
    } else {
      responseMessage = "Usage:\n- `automreply on`: Enable Auto-reply\n- `automreply off`: Disable Auto-reply";
    }

    try {
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error processing your request:", error);
      await Matrix.sendMessage(m.from, { text: 'Error processing your request.' }, { quoted: m });
    }
  }

  // Handle 'automreply' command (second occurrence, if needed)
  else if (cmd === 'automreply') {
    // If you need to handle another action for automreply, you can add another block here
  }
};

export default autotypingCommand;
