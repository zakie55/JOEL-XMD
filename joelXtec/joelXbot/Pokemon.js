import config from '../../config.cjs';

// In-memory user data (for demo purposes)
const userBalances = {};
const userWallets = {};  // To store purchased anime

const wallpaperCmd = async (m, sock) => {
  const prefix = config.PREFIX;
  const pushName = m.pushName || 'User';
  const userId = m.sender;

  // Extract the command name (e.g., "winmoney", "buy", "pokemon", "wallet")
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';

  // Helper function to send a text message with context info
  const sendCommandMessage = async (messageContent) => {
    const messagePayload = {
      text: messageContent,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363317462952356@newsletter',
          newsletterName: "ᴊᴏᴇʟ xᴅ ʙᴏᴛ",
          serverMessageId: -1,
        },
        externalAdReply: {
          title: "ᴊᴏᴇʟ xᴅ ʙᴏᴛ",
          body: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ",
          thumbnailUrl:
            'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/joelXbot.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    };

    await sock.sendMessage(m.from, messagePayload, { quoted: m });
  };

  // Handle the "winmoney" command (user wins a random amount of money)
  if (cmd === "winmoney") {
    const amountWon = Math.floor(Math.random() * 100) + 1; // Random amount between 1 and 100
    if (!userBalances[userId]) {
      userBalances[userId] = 0; // Initialize user's balance if not set
    }

    userBalances[userId] += amountWon; // Add the won amount to user's balance

    // Cool formatted message with borders and design elements
    const message = `
━━━━━━━━━━━━━━━
🎉 **Congratulations ${pushName}!** 🎉
━━━━━━━━━━━━━━━
💰 You’ve won **$${amountWon}!**

💸 Your new balance: **$${userBalances[userId]}** 💸
    
🎯 Keep playing and earn more! 🏆
━━━━━━━━━━━━━━━
✨ *Good luck next time!* ✨
━━━━━━━━━━━━━━━
    `;
    await sendCommandMessage(message);
  }

  // Handle the "buy" command (user buys the Pokémon anime if they have enough money)
  if (cmd === "buy") {
    const pokemonCost = 19.99; // Cost of the Pokémon anime
    const userBalance = userBalances[userId] || 0;

    if (userBalance >= pokemonCost) {
      // User has enough money to buy the Pokémon anime
      userBalances[userId] -= pokemonCost; // Deduct the cost from user's balance

      // Add Pokémon anime to the user's wallet
      if (!userWallets[userId]) {
        userWallets[userId] = [];  // Initialize if the user doesn't have a wallet
      }
      userWallets[userId].push("Pokémon Anime");

      // Example of sending an image with the cost of the Pokémon anime
      const pokemonImage = 'https://example.com/pokemon-anime-image.jpg'; // Image URL for Pokémon anime
      const caption = `
💳 **Purchase Successful!** 💳

🎬 **You’ve bought the Pokémon Anime!** 🎬

💸 **Cost**: **$${pokemonCost}**

🎯 **Remaining balance**: **$${userBalances[userId]}**

🎁 **Your purchase has been added to your wallet!** 🎉
`;

      const messagePayload = {
        image: { url: pokemonImage },
        caption: caption,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363317462952356@newsletter',
            newsletterName: "ᴊᴏᴇʟ xᴅ ʙᴏᴛ",
            serverMessageId: -1,
          },
          externalAdReply: {
            title: "ᴊᴏᴇʟ xᴅ ʙᴏᴛ",
            body: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ",
            thumbnailUrl:
              'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/joelXbot.jpg',
            sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      };

      await sock.sendMessage(m.from, messagePayload, { quoted: m });
    } else {
      // Not enough money to buy
      const message = `
━━━━━━━━━━━━━━━
⚠️ **Oops! Not enough money** ⚠️
━━━━━━━━━━━━━━━
💰 **Your balance**: **$${userBalance}**

💸 **Pokémon Anime costs**: **$19.99**

🎯 Start winning money and try again! 🏅
━━━━━━━━━━━━━━━
✨ *Keep playing to earn more!* ✨
━━━━━━━━━━━━━━━
      `;
      await sendCommandMessage(message);
    }
  }

  // Handle the "wallet" command (user views their purchased items)
  if (cmd === "wallet") {
    const userPurchases = userWallets[userId] || [];

    if (userPurchases.length === 0) {
      const message = `
━━━━━━━━━━━━━━━
👜 **Your Wallet is Empty!** 👜
━━━━━━━━━━━━━━━

You haven't purchased anything yet. 

💸 Start winning money and purchasing your favorite items! 🛍️

🎯 *Happy Shopping!* 🎯
━━━━━━━━━━━━━━━
      `;
      await sendCommandMessage(message);
    } else {
      const purchasesList = userPurchases.map((item, index) => `${index + 1}. ${item}`).join("\n");

      const message = `
━━━━━━━━━━━━━━━
👜 **Your Wallet** 👜
━━━━━━━━━━━━━━━
${purchasesList}

🎉 *Enjoy your purchases!* 🎉
━━━━━━━━━━━━━━━
      `;
      await sendCommandMessage(message);
    }
  }

  // Handle the "pokemon" command to notify group of the new Pokémon anime available to buy
  if (cmd === "pokemon") {
    try {
      const pokemonImage = 'https://example.com/pokemon-anime-image.jpg'; // Image URL for Pokémon anime
      const pokemonCost = '$19.99'; // Cost of the Pokémon anime
      const caption = `
━━━━━━━━━━━━━━━
🔥 **New Pokémon Anime Available for Purchase!** 🔥
━━━━━━━━━━━━━━━
💳 **Cost**: **${pokemonCost}**

🎬 **Get it now and enjoy!** 🎬

💥 **Limited time offer!** 💥
━━━━━━━━━━━━━━━
      `;

      const messagePayload = {
        image: { url: pokemonImage },
        caption: caption,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363317462952356@newsletter',
            newsletterName: "ᴊᴏᴇʟ xᴅ ʙᴏᴛ",
            serverMessageId: -1,
          },
          externalAdReply: {
            title: "ᴊᴏᴇʟ xᴅ ʙᴏᴛ",
            body: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ",
            thumbnailUrl:
              'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/joelXbot.jpg',
            sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      };

      await sock.sendMessage(m.from, messagePayload, { quoted: m });
    } catch (error) {
      console.error(error);
      await sendCommandMessage("⚠️ An error occurred while fetching the Pokémon anime. Please try again later!");
    }
  }
};

export default wallpaperCmd;
