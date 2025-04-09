/*
1. chatbot on
2. chatbot off
3. lydea
4. lydia
5. bot
6. automreply on
7. automreply off

*/

import config from '../../config.cjs';

const autotypingCommand = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === 'chatbot') {
    if (!isCreator) return m.reply("*Aww, only my creator can use this command! 🥺💖*");
    
    let responseMessage;

    if (text === 'on') {
      config.CHAT_BOT = true;
      responseMessage = "Yay! 🥳 The chatbot is now *ON*! Ready to chat with you anytime! 💬";
    } else if (text === 'off') {
      config.CHAT_BOT = false;
      responseMessage = "Aww, I’ll miss chatting with you! 😢 The chatbot is now *OFF*. Come back soon! ✨";
    } else {
      responseMessage = "Oopsie! 😅 Here's how to use me:\n- `chatbot on`: Turn me *ON* and let's chat! 💬\n- `chatbot off`: Turn me *OFF* and I’ll rest 💤";
    }

    try {
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error processing your request:", error);
      await Matrix.sendMessage(m.from, { text: 'Oops! Something went wrong 😬. Please try again later!' }, { quoted: m });
    }

  } else if (cmd === 'lydea' || cmd === 'lydia') {
    let responseMessage = "Oh, you’re calling me by my special name? 🥰 I’m *Lydia* or *Lydea*—whichever you prefer! 💖 Let’s chat!";
    
    try {
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error processing your request:", error);
      await Matrix.sendMessage(m.from, { text: 'Oops! Something went wrong 😬. Please try again later!' }, { quoted: m });
    }

  } else if (cmd === 'bot') {
    let responseMessage = "Yup! That’s me, your cute and friendly bot! 🤖💖 What can I do for you today?";
    
    try {
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error processing your request:", error);
      await Matrix.sendMessage(m.from, { text: 'Oops! Something went wrong 😬. Please try again later!' }, { quoted: m });
    }

  } else if (cmd === 'automreply') {
    if (!isCreator) return m.reply("*Only my creator can toggle automessage settings! 🥺💖*");

    let responseMessage;

    if (text === 'on') {
      config.AUTO_REPLY = true;
      responseMessage = "Auto-reply is now *ON*! I’ll be sure to reply to all messages automatically! 📲✨";
    } else if (text === 'off') {
      config.AUTO_REPLY = false;
      responseMessage = "Auto-reply is now *OFF*. I’ll rest a little and only reply when needed. 😌💤";
    } else {
      responseMessage = "Oopsie! 😅 Here's how to use me:\n- `automreply on`: Turn auto-reply *ON* 📲\n- `automreply off`: Turn auto-reply *OFF* and let me rest 💤";
    }

    try {
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error processing your request:", error);
      await Matrix.sendMessage(m.from, { text: 'Oops! Something went wrong 😬. Please try again later!' }, { quoted: m });
    }
  } else {
    let responseMessage = "Oopsie! 😅 I didn't quite catch that. Here are some commands you can use:\n- `chatbot on/off`: Toggle chatbot 🗣️\n- `lydea` or `lydia`: Call me by my special name 💖\n- `bot`: Learn about me 🤖\n- `automreply on/off`: Toggle auto-reply 📲";

    try {
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error processing your request:", error);
      await Matrix.sendMessage(m.from, { text: 'Oops! Something went wrong 😬. Please try again later!' }, { quoted: m });
    }
  }
};

export default autotypingCommand;
