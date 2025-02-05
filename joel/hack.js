
const {cmd , commands} = require('../command');

cmd({
    pattern: "hack",
    desc: "Displays a dynamic and playful 'Hacking' message for fun.",
    category: "fun",
    react: "👨‍💻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const steps = [
            ' *ᴊᴏᴇʟ xᴍᴅ ʙᴜɢɢɪɴɢ* ',
            '```hacking into device  0%```',
            ', "```transfering photos  █ 10%```', 
            '```transfer successful     █ █ 20%```',
            '```transfering videos      █ █ █ 30%```',
            '```transfer successful     █ █ █ █ 40%```',
            '```transfering audio       █ █ █ █ █ 50%```',
            ' *your device have been hacked  to avoid this action delete your whatsapp account*'
        ];

        for (const line of steps) {
            await conn.sendMessage(from, { text: line }, { quoted: mek });
            await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay as needed
        }
    } catch (e) {
        console.log(e);
        reply(`❌ *Error!* ${e.message}`);
    }
});
