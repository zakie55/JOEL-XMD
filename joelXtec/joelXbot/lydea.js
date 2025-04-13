import config from '../../config.cjs';
import fetch from 'node-fetch';

// In-memory store for user conversations
const userConversations = {}; // { userId: [ { role: 'user'|'assistant', content: string } ] }

const chatbotCommand = async (m, Matrix) => {
    const text = m.message?.conversation || m.message?.extendedTextMessage?.text || null;
    const senderId = m.key.remoteJid;
    const senderName = m.pushName || `User ${senderId}`;

    const ownerNumber = config.OWNER_NUMBER + '@s.whatsapp.net';
    const isChatbotEnabled = config.CHAT_BOT !== undefined ? config.CHAT_BOT : true;
    const chatbotMode = config.CHAT_BOT_MODE || 'public';
    const privateUsers = config.PRIVATE_USERS || [];

    if (!isChatbotEnabled) return;
    if (senderId === ownerNumber) return;
    if (senderId.endsWith('@g.us') || senderId === 'status@broadcast' || senderId.includes('@newsletter')) return;
    if (chatbotMode === 'private' && !privateUsers.includes(senderId)) return;
    if (!text) return;

    try {
        // Initialize conversation history if not exists
        if (!userConversations[senderId]) {
            userConversations[senderId] = [];
        }

        // Add user message to history
        userConversations[senderId].push({ role: 'user', content: text });

        // Keep history short (last 20 messages)
        if (userConversations[senderId].length > 20) {
            userConversations[senderId] = userConversations[senderId].slice(-20);
        }

        // Send full context to the API
        const response = await fetch('https://api.siputzx.my.id/api/ai/deepseek-r1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ messages: userConversations[senderId] })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        const botReply = responseData.result || 'No response received';

        // Add bot response to history
        userConversations[senderId].push({ role: 'assistant', content: botReply });

        const formattedReply = `${botReply}`;
        await Matrix.sendMessage(senderId, { text: formattedReply }, { quoted: m });

    } catch (err) {
        console.error('Error fetching AI response:', err.message);
        await Matrix.sendMessage(senderId, { text: '❌ Failed to fetch response from the server.' }, { quoted: m });
    }
};

export default chatbotCommand;
