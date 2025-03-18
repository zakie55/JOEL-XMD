mport config from "../../config.cjs";

const groupInfo = async (message, sock) => {
    const prefix = config.PREFIX;
    const command = message.body.startsWith(prefix)
        ? message.body.slice(prefix.length).split(" ")[0].toLowerCase()
        : "";
    const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';
  
  const sendCommandMessage = async (messageContent) => {
    await sock.sendMessage(
      m.from,
      {
        text: messageContent,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363317462952356@newsletter', // Preserved newsletter JID
            newsletterName: "ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ",
            serverMessageId: -1,
          },
          externalAdReply: {
            title: "ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ",
            body: pushName,
            thumbnailUrl: 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/repo.jpg', // Thumbnail URL
            sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K', // Source URL
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
  };
// lord joel 

    if (command !== "gci") return;

    const chatId = message.key.remoteJid;
    const isGroup = chatId.endsWith("@g.us");
    if (!isGroup) return message.reply("*This command only works in group chats!*");

    try {
        const metadata = await sock.groupMetadata(chatId);
        const admins = metadata.participants.filter(p => p.admin);
        const creator = metadata.owner ? `@${metadata.owner.split("@")[0]}` : "Unknown";
        const description = metadata.desc ? metadata.desc : "No description set.";

        let infoText = `╭───❍「 *Group Information* 」\n`;
        infoText += `│ *Name:* ${metadata.subject}\n`;
        infoText += `│ *Group ID:* ${metadata.id}\n`;
        infoText += `│ *Members:* ${metadata.participants.length}\n`;
        infoText += `│ *Admins:* ${admins.length}\n`;
        infoText += `│ *Created by:* ${creator}\n`;
        infoText += `│ *Created on:* ${new Date(metadata.creation * 1000).toLocaleString()}\n`;
        infoText += `╰───────────❍\n\n`;
        infoText += `*Description:* \n_${description}_\n\n*KEEP USING JOEL XMD BOT*`;

        await sock.sendMessage(chatId, { text: infoText }, { quoted: message });

    } catch (error) {
        console.error("Group Info Error:", error);
        return message.reply("*Failed to fetch group info. Try again!*");
    }
};

export default groupInfo;
