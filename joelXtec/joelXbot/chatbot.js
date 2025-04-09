/*
import config from '../../config.cjs';
import fetch from 'node-fetch';

const chatbotCommand = async (m, Matrix) => {

    const text = m.message?.conversation || m.message?.extendedTextMessage?.text || null; // Extract text
    const senderId = m.key.remoteJid; // This gives the full sender ID (including @s.whatsapp.net)
    const senderName = m.pushName || `User ${senderId}`; // Default to 'User <senderId>' if pushName is not available

    // Get the owner's phone number from config
    const ownerNumber = config.OWNER_NUMBER + '@s.whatsapp.net'; // Construct full ID for owner number

    // Chatbot configuration
    const isChatbotEnabled = config.CHAT_BOT || true; // Enable/disable chatbot
    const chatbotMode = config.CHAT_BOT_MODE || 'public'; // 'private' or 'public'
    const privateUsers = config.PRIVATE_USERS || []; // Allowed users for private mode

    // Ignore all messages if chatbot is disabled
    if (!isChatbotEnabled) {
        console.log('Chatbot is disabled via config. Ignoring message.');
        return;
    }

    // Ignore all owner messages globally, regardless of chat type (group, private, etc.)
    if (senderId === ownerNumber) {
        console.log('Owner message ignored.');
        return;
    }

    // Ignore group, broadcast, and newsletter messages
    if (senderId.endsWith('@g.us') || senderId === 'status@broadcast' || senderId.includes('@newsletter')) {
        console.log('Group, broadcast, or newsletter message ignored.');
        return;
    }

    // Private mode: Process only specific users
    if (chatbotMode === 'private' && !privateUsers.includes(senderId)) {
        console.log(`Message from unauthorized user ignored in private mode: ${senderId}`);
        return;
    }

    // If there is no message text, return
    if (!text) {
        console.log('No valid message found to process.');
        return;
    }

    // Process user messages and fetch response from the API
    try {
        const userMessage = text;

        // Make the API call to the chatbot service
        const response = await fetch(`https://apis.davidcyriltech.my.id/ai/chatbot?query=${encodeURIComponent(userMessage)}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        const botReply = responseData.result || 'No response received';
        const formattedReply = `*JOEL-MD AI ASSISTANT *\n\nHello ${senderName},\n\n${botReply}`;

        // Send the AI response to the user
        await Matrix.sendMessage(senderId, { text: formattedReply }, { quoted: m });

    } catch (err) {
        console.error('Error fetching AI response:', err.message);
        await Matrix.sendMessage(senderId, { text: '❌ Failed to fetch response from the server.' }, { quoted: m });
    }
};

export default chatbotCommand;
*/


import config from '../../config.cjs';
import fetch from 'node-fetch';

const chatbotCommand = async (m, Matrix) => {
    const prefix = config.PREFIX || '!'; // Default prefix if not set in config
    const text = m.message?.conversation || m.message?.extendedTextMessage?.text || null; // Extract text
    const senderId = m.key.remoteJid; // This gives the full sender ID (including @s.whatsapp.net)
    const senderName = m.pushName || `User ${senderId}`; // Default to 'User <senderId>' if pushName is not available

    // Get the owner's phone number from config
    const ownerNumber = config.OWNER_NUMBER + '@s.whatsapp.net'; // Construct full ID for owner number

    // Chatbot configuration
    let isChatbotEnabled = config.CHAT_BOT || true; // Enable/disable chatbot
    const chatbotMode = config.CHAT_BOT_MODE || 'public'; // 'private' or 'public'
    const privateUsers = config.PRIVATE_USERS || []; // Allowed users for private mode

    // Ignore all messages if chatbot is disabled
    if (!isChatbotEnabled) {
        console.log('Chatbot is disabled via config. Ignoring message.');
        return;
    }

    // Ignore all owner messages globally, regardless of chat type (group, private, etc.)
    if (senderId === ownerNumber) {
        console.log('Owner message ignored.');
        return;
    }

    // Ignore group, broadcast, and newsletter messages
    if (senderId.endsWith('@g.us') || senderId === 'status@broadcast' || senderId.includes('@newsletter')) {
        console.log('Group, broadcast, or newsletter message ignored.');
        return;
    }

    // Private mode: Process only specific users
    if (chatbotMode === 'private' && !privateUsers.includes(senderId)) {
        console.log(`Message from unauthorized user ignored in private mode: ${senderId}`);
        return;
    }

    // If there is no message text, return
    if (!text) {
        console.log('No valid message found to process.');
        return;
    }

    // Check if the message starts with the configured prefix and if it contains a valid chatbot command
    if (text.startsWith(prefix)) {
        const commandText = text.slice(prefix.length).trim(); // Remove prefix and trim the command text
        const commandPattern = /^(lydea|Lydia|chatbot|Alexa|bot)\s+(on|false)$/i;
        const match = commandText.match(commandPattern);

        if (match) {
            const [_, botName, status] = match;
            const action = status.toLowerCase() === 'on' ? true : false;

            // Toggle the chatbot's status based on the command
            if (['lydea', 'Lydia', 'chatbot', 'Alexa', 'bot'].includes(botName.toLowerCase())) {
                config.CHAT_BOT = action; // Update the configuration (ensure this is reflected properly if it's dynamic)
                await Matrix.sendMessage(senderId, { text: `Chatbot has been ${action ? 'enabled' : 'disabled'}.` }, { quoted: m });
                console.log(`Chatbot ${action ? 'enabled' : 'disabled'} by ${senderName}.`);
            }
            return; // No need to continue processing further if it's a control command
        }
    }

    // Process user messages and fetch response from the API if it's not a control command
    try {
        const userMessage = text;

        // Make the API call to the chatbot service
        const response = await fetch(`https://apis.davidcyriltech.my.id/ai/chatbot?query=${encodeURIComponent(userMessage)}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        const botReply = responseData.result || 'No response received';
        const formattedReply = `*${botReply}*`;

        // Send the AI response to the user
        await Matrix.sendMessage(senderId, { text: formattedReply }, { quoted: m });

    } catch (err) {
        console.error('Error fetching AI response:', err.message);
        await Matrix.sendMessage(senderId, { text: '❌ Failed to fetch response from the server.' }, { quoted: m });
    }
};

export default chatbotCommand;
