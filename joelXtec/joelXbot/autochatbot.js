import config from '../../config.cjs';

const modeCommand = async (m, Matrix) => {
    const botNumber = await Matrix.decodeJid(Matrix.user.id);
    const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
    const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

 text = m.body.slice(prefix.length + cmd.length).trim();

    if (cmd === 'chatbot') {
        if (!isCreator) {
            await Matrix.sendMessage(m.from, { text: "*💖 Oops! Only my creator can use this command!*" }, { quoted: m });
            return;
        }

        if (['on', 'off'].includes(text)) {
            if (text === 'on') {
                Matrix.public = true;
                config.CHAT_BOT = "true";
                updateConfig('CHAT_BOT', 'true');  // Persist to config file
                m.reply('*✨ Yay! The chatbot is now active and ready to chat with everyone!*');
            } else if (text === 'off') {
                Matrix.public = false;
                config.CHAT_BOT = "false";
                updateConfig('CHAT_BOT', 'false');  // Persist to config file
                m.reply('*🌙 Shhh! The chatbot is now in private mode...*');
            }
        } else {
            m.reply("*😕 Hmm, I didn't quite catch that. Please use 'on' or 'off' to change the mode.*");
        }
    }
};

export default modeCommand;
