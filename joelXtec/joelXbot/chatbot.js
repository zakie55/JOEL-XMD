import config from '../../config.cjs';
import fetch from 'node-fetch';

let isChatbotEnabled = config.CHAT_BOT || true;  // Set initial state of the chatbot
let isAutoReplyEnabled = false; // Auto-reply state (default is off)
const commandPrefix = config.PREFIX || '!'; // Get the prefix from the config

const chatbotCommand = async (m, Matrix) => {
    const text = m.message?.conversation || m.message?.extendedTextMessage?.text || null; // Extract text
    const senderId = m.key.remoteJid; // This gives the full sender ID (including @s.whatsapp.net)
    const senderName = m.pushName || `User ${senderId}`; // Default to 'User <senderId>' if pushName is not available

    // Get the owner's phone number from config
    const ownerNumber = config.OWNER_NUMBER + '@s.whatsapp.net'; // Construct full ID for owner number

    // Chatbot configuration
    const chatbotMode = config.CHAT_BOT_MODE || 'public'; // 'private' or 'public'
    const privateUsers = config.PRIVATE_USERS || []; // Allowed users for private mode

    // Ensure the command starts with the configured prefix
    if (!text.startsWith(commandPrefix)) {
        return; // Ignore messages that don't start with the prefix
    }

    // Extract command without prefix
    const command = text.slice(commandPrefix.length).trim().toLowerCase(); // Get command after the prefix

    // Handle specific commands
    if (command === 'lydia' || command === 'lydea') {
        await Matrix.sendMessage(senderId, { text: '💖 Heya! I’m here to help you! ✨' }, { quoted: m });
        console.log('Command "lydia" or "lydea" received.');
        return; // You can add specific functionality for this command if needed
    }

    if (command === 'bot' || command === 'chatbot') {
        // Enable or disable the bot with "bot on" or "bot off"
        const toggleCommand = command.split(' ')[1];
        if (toggleCommand === 'on') {
            if (senderId === ownerNumber) {
                isChatbotEnabled = true;
                await Matrix.sendMessage(senderId, { text: '🌟 Yay! The chatbot is now ON! Ready to chat! 🐱' }, { quoted: m });
                console.log('Chatbot enabled by owner.');
            } else {
                await Matrix.sendMessage(senderId, { text: '🚫 Oops! Only the owner can turn me on/off. 🥺' }, { quoted: m });
            }
        } else if (toggleCommand === 'off') {
            if (senderId === ownerNumber) {
                isChatbotEnabled = false;
                await Matrix.sendMessage(senderId, { text: '😢 Aww, I’m going to sleep now. Chatbot is OFF! 💤' }, { quoted: m });
                console.log('Chatbot disabled by owner.');
            } else {
                await Matrix.sendMessage(senderId, { text: '🚫 Oops! Only the owner can turn me on/off. 🥺' }, { quoted: m });
            }
        }
        return;
    }

    if (command === 'automreply') {
        // Toggle auto-reply
        if (senderId === ownerNumber) {
            isAutoReplyEnabled = !isAutoReplyEnabled;
            const status = isAutoReplyEnabled ? '💬 Auto-reply is ON! I’ll reply to you automatically. 🐾' : '❌ Auto-reply is OFF. I’ll reply only when you message me! 🦄';
            await Matrix.sendMessage(senderId, { text: status }, { quoted: m });
            console.log(`Auto-reply ${isAutoReplyEnabled ? 'enabled' : 'disabled'} by owner.`);
        } else {
            await Matrix.sendMessage(senderId, { text: '🚫 Only the owner can change the auto-reply settings. 🥺' }, { quoted: m });
        }
        return;
    }

    // If chatbot is off, stop processing and do not reply to messages
    if (!isChatbotEnabled) {
        console.log('💤 Chatbot is off... Not responding to messages. 😴');
        return;
    }

    // Ignore all owner messages globally, regardless of chat type (group, private, etc.)
    if (senderId === ownerNumber) {
        console.log('❌ Owner message ignored.');
        return;
    }

    // Ignore group, broadcast, and newsletter messages
    if (senderId.endsWith('@g.us') || senderId === 'status@broadcast' || senderId.includes('@newsletter')) {
        console.log('🙅‍♀️ Group, broadcast, or newsletter message ignored.');
        return;
    }

    // Private mode: Process only specific users
    if (chatbotMode === 'private' && !privateUsers.includes(senderId)) {
        console.log(`🚫 Unauthorized user ignored in private mode: ${senderId}`);
        return;
    }

    // If there is no message text, return
    if (!text) {
        console.log('❌ No message found to process.');
        return;
    }

    // Process user messages and fetch response from the API
    try {
        const userMessage = text;

        // Make the API call to the chatbot service
        const response = await fetch(`https://apis.davidcyriltech.my.id/ai/chatbot?query=${encodeURIComponent(userMessage)}`);

        if (!response.ok) {
            throw new Error(`💥 Something went wrong! Status: ${response.status}`);
        }

        const responseData = await response.json();
        const botReply = responseData.result || 'Hmm, I couldn’t understand that... Can you try again? 😅';
        const formattedReply = `💖 *JOEL-MD AI ASSISTANT* 💖\n\nHey ${senderName}! 🐱\n\n${botReply} 😺`;

        // Send the AI response to the user
        await Matrix.sendMessage(senderId, { text: formattedReply }, { quoted: m });

    } catch (err) {
        console.error('❌ Error fetching AI response:', err.message);
        await Matrix.sendMessage(senderId, { text: '💥 Oops! I couldn’t get a response. Please try again later. 😢' }, { quoted: m });
    }
};

export default chatbotCommand;
