import config from '../../config.cjs';
import fetch from 'node-fetch';

let awayMessageEnabled = false;  // Initially, away message is off
let awayMessageText = 'Hello, I\'m unavailable.'; // Default away message text

// Array of constant greetings with cute emojis
const greetings = [
    'Hi there! 😊',
    'Hello! 🌸',
    'Hey, how can I assist you today? 🐾',
    'Greetings! ✨',
    'Hello, I\'m currently unavailable. 💤',
    'Good day! ☀️',
    'Hi, I\'m away at the moment. 🌙',
    'Hey, I\'ll get back to you shortly! 🕒',
    'Hi! 🌷 I\'m not available right now, but I\'ll reply soon! 💖',
    'Hey there! 💫 I’m away, but I’ll respond as soon as I can! 🐝',
    'Hello! 🦄 I’m temporarily away, but I’ll be back soon! 🐾',
    'Hey! 💌 I’m offline right now, but I’ll get back to you ASAP! 🌟'
];

// Function to get a random greeting with emojis
const getRandomGreeting = () => {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    return greetings[randomIndex];
};

const awayMessageCommand = async (m, Matrix) => {
    // Retrieve the prefix from the config
    const prefix = config.PREFIX;

    // Extract the command from the message
    const cmd = m.body.startsWith(prefix)
        ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()  // Get the command
        : '';

    const text = m.message?.conversation || m.message?.extendedTextMessage?.text || null; // Extract text
    const senderId = m.key.remoteJid; // This gives the full sender ID (including @s.whatsapp.net)
    const senderName = m.pushName || `User ${senderId}`; // Default to 'User <senderId>' if pushName is not available

    // Get the owner's phone number from config
    const ownerNumber = `${config.OWNER_NUMBER}@s.whatsapp.net`; // Construct full ID for owner number

    // Ignore all messages from non-owner users
    if (senderId !== ownerNumber) {
        console.log('Command ignored: Not from the owner.');
        return;
    }

    // Only process if the command is related to away message (e.g., "amessage on", "amessage off", etc.)
    if (cmd === 'amessage') {
        // If message is "amessage on" - Enable Away message
        if (text && text.toLowerCase() === `${prefix}amessage on`) {
            awayMessageEnabled = true;
            console.log('Away message is now ENABLED.');
            await Matrix.sendMessage(senderId, { text: '✔️ Away message is now enabled.' }, { quoted: m });
            return;
        }

        // If message is "amessage off" - Disable Away message
        if (text && text.toLowerCase() === `${prefix}amessage off`) {
            awayMessageEnabled = false;
            console.log('Away message is now DISABLED.');
            await Matrix.sendMessage(senderId, { text: '❌ Away message is now disabled.' }, { quoted: m });
            return;
        }

        // If message is "enable away message" - Enable Away message
        if (text && text.toLowerCase() === `${prefix}enable away message`) {
            awayMessageEnabled = true;
            console.log('Away message is now ENABLED.');
            await Matrix.sendMessage(senderId, { text: '✔️ Away message is now enabled.' }, { quoted: m });
            return;
        }

        // If message is "disable away message" - Disable Away message
        if (text && text.toLowerCase() === `${prefix}disable away message`) {
            awayMessageEnabled = false;
            console.log('Away message is now DISABLED.');
            await Matrix.sendMessage(senderId, { text: '❌ Away message is now disabled.' }, { quoted: m });
            return;
        }

        // If message is "set away message <new message>" - Update Away message text
        if (text && text.toLowerCase().startsWith(`${prefix}set away message`)) {
            const newMessage = text.slice(`${prefix}set away message`.length).trim(); // Get the message after the command
            if (newMessage) {
                awayMessageText = newMessage;
                console.log(`Away message updated to: "${awayMessageText}"`);
                await Matrix.sendMessage(senderId, { text: `✔️ Away message updated to: "${awayMessageText}"` }, { quoted: m });
            } else {
                await Matrix.sendMessage(senderId, { text: '❌ Please provide a new away message.' }, { quoted: m });
            }
            return;
        }

        // If away message is enabled and the user sends a message, send the away message
        if (awayMessageEnabled) {
            const greeting = getRandomGreeting(); // Get a random greeting
            const messageToSend = `${greeting} ${awayMessageText}`; // Combine greeting with the away message
            await Matrix.sendMessage(senderId, { text: messageToSend }, { quoted: m });
        }
    }
};

export default awayMessageCommand;
