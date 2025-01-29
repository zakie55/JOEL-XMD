const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "enter your session",
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
MODE: process.env.MODE || "public",
AUTO_VOICE: process.env.AUTO_VOICE || "true",
AUTO_STICKER: process.env.AUTO_STICKER || "true",
AUTO_REPLY: process.env.AUTO_REPLY || "true",
OWNER_IMG: process.env.OWNER_IMG || "https://files.catbox.moe/5a2euh.jpg",
ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/sgld88.jpg",
ALIVE_MSG: process.env.ALIVE_MSG || "*ᴀᴍ ᴀʟɪᴠᴇ ᴍᴏᴛʜᴇʀғᴜᴄᴋᴇʀ*",
ANTI_LINK: process.env.ANTI_LINK || "true",
ANTI_BAD: process.env.ANTI_BAD || "true",
PREFIX: process.env.PREFIX || ".",
AUTO_RECORDING: process.env.AUTO_RECORDING || "",
ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "",
AUTO_TYPING: process.env.AUTO_TYPING || "true",
AUTO_REACT: process.env.AUTO_REACT || "false",
OWNER_REACT: process.env.OWNER_REACT || "",
BOT_NAME: process.env.BOT_NAME || "ᴊᴏᴇʟ ᴍᴅ",
OMDB_API_KEY: process.env.OMDB_API_KEY || "76cb7f39", // omdbapi.com
};
