import fetch from 'node-fetch'; // Import node-fetch to make API requests

// Function to handle the 'advice' command
const getAdvice = async (m, sock) => {
  try {
    // React with loading emoji while fetching advice
    await m.React('⏳'); 

    // Fetch advice from the API
    const response = await fetch('https://api.adviceslip.com/advice');
    
    // Check if response was successful
    if (!response.ok) {
      throw new Error('Failed to fetch advice');
    }

    const data = await response.json();

    if (data && data.slip && data.slip.advice) {
      // Extract advice from the response
      const advice = data.slip.advice;

      // Send the advice back to the user
      await sock.sendMessage(
        m.from,
        {
          text: `💡 *Advice of the day:* \n\n"${advice}"`,
          contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363317462952356@newsletter',
              newsletterName: "ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ",
              serverMessageId: -1,
            },
            forwardingScore: 999, // Score to indicate it has been forwarded
            externalAdReply: {
              title: "ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ ᴠ¹⁰",
              body: "💡 ᴀᴅᴠɪᴄᴇ ᴏғ ᴛʜᴇ ᴅᴀʏ",
              thumbnailUrl: 'https://avatars.githubusercontent.com/u/162905644?v=4',
              sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
              mediaType: 1,
              renderLargerThumbnail: false,
            },
          },
        },
        { quoted: m }
      );
    } else {
      // If no advice is found, inform the user
      await sock.sendMessage(
        m.from,
        {
          text: "Sorry, I couldn't fetch advice at the moment. Please try again later.",
        },
        { quoted: m }
      );
    }
  } catch (error) {
    // Handle any errors (like fetch failure)
    console.error(error); // Log the error for debugging
    await sock.sendMessage(
      m.from,
      {
        text: "Something went wrong while fetching advice. Please try again later.",
      },
      { quoted: m }
    );
  }
};

// Command handler function
const commandHandler = async (m, sock) => {
  // Extract the command from the message (e.g., "advice")
  const cmd = m.text.trim().toLowerCase();

  if (cmd === 'advice') {
    await getAdvice(m, sock); // Call getAdvice function when 'advice' command is triggered
  } else {
    // Handle other commands or messages
    console.log(`Unrecognized command: ${cmd}`);
  }
};

export default commandHandler;
