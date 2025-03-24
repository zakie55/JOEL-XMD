import config from '../../config.cjs';
import fetch from 'node-fetch';

let awayMessageEnabled = false;  // Initially, away message is off
let awayMessageText = 'Hello, I\'m unavailable.'; // Updated away message text

const awayMessageCommand = async (m, Matrix) => {
    const text = m.message?.conversation || m.message?.extendedTextMessage?.text || null; // Extract text
    const senderId = m.key.remoteJid; // This gives the full sender ID (including @s.whatsapp.net)
    const senderName = m.pushName || `User ${senderId}`; // Default to 'User <senderId>' if pushName is not available

    // Get the owner's phone number from config
    const ownerNumber = config.OWNER_NUMBER + '@s.whatsapp.net'; // Construct full ID for owner number

    // Ignore all messages from the owner globally
    if (senderId === ownerNumber) {
        console.log('Owner message ignored.');
        return;
    }

    // If message is "amessage on" - Enable Away message
    if (text && text.toLowerCase() === 'amessage on') {
        awayMessageEnabled = true;
        console.log('Away message is now ENABLED.');
        await Matrix.sendMessage(senderId, { text: '✔️ Away message is now enabled.' }, { quoted: m });
        return;
    }

    // If message is "amessage off" - Disable Away message
    if (text && text.toLowerCase() === 'amessage off') {
        awayMessageEnabled = false;
        console.log('Away message is now DISABLED.');
        await Matrix.sendMessage(senderId, { text: '❌ Away message is now disabled.' }, { quoted: m });
        return;
    }

    // If away message is enabled and the user sends a message, send the away message
    if (awayMessageEnabled) {
        await Matrix.sendMessage(senderId, { text: awayMessageText }, { quoted: m });
    }
};

export default awayMessageCommand;
