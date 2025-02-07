
const {cmd , commands} = require('../command');

cmd({
    pattern: "gay",
    desc: "Displays a dynamic and playful 'Hacking' message for fun.",
    category: "fun",
    react: "🍆",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const steps = [
            '```you are a gay```',
            '```if not why you recomanded it```',
            '```bitch```', 
            '*i will fuck you up*',
            '*🍆🍑*'
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
