
const {cmd , commands} = require('../command');

cmd({
    pattern: "hack",
    desc: "Displays a dynamic and playful 'Hacking' message for fun.",
    category: "fun",
    react: "🐜",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const steps = [
            ' *ᴊᴏᴇʟ xᴍᴅ ʙᴜɢɢɪɴɢ* ',
            '```joel xmd bot is hacking your whatsapp account',
            '```hacking into device  0%```',
            '```transfering photos \n █ 10%```', 
            '```transfer successful \n █ █ 20%```',
            '```transfering videos \n █ █ █ 30%```',
            '```transfer successful \n  █ █ █ █ 40%```',
            '```transfering audio  \n █ █ █ █ █ 50%```',
            '```transfer successful \n █ █ █ █ █ █ 60%```',
            '```transfering hidden files \n █ █ █ █ █ █ █ 70%```',
            '```transfer successful \n █ █ █ █ █ █ █ █ 80%```',
            '```transfering whatsapp chat \n █ █ █ █ █ █ █ █ █ 90%```'
            '```transfering successfully \n █ █ █ █ █ █ █ █ █ █ 100%```',
            '```System hyjacking on process.. \n Conecting to Server ```',
            '```Divice successfully connected... \n Riciving data...```',
            '```Data hyjacked from divice 100% completed \n killing all evidence killing all malwares...```',
            '``` HACKING COMPLETED ```',
            '``` SUCCESSFULLY SENT DATA AND Connection disconnected```',
            '``` SENDING PHONE DOCUMENTS...```',
            '*ALL FILES TRANSFERRED*',
            '```your device have been hacked  to avoid this action delete your whatsapp account```'
            ' *ʟᴏʀᴅ ᴊᴏᴇʟ*'
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
