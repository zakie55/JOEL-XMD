import config from "../../config.cjs";

const antilinkDB = new Map(); // Temporary in-memory storage
const prefixMatch = m.body.match(/^[\\/!abcdefghijklmnopq rstuvwxyz:?! - _ @#$%&*+=<>~0123456789ABCDEGHIJKLMNOPQRSTUVWXY Z#.]/);
const prefix = prefixMatch ? prefixMatch[0] : '/';

const antiLink = async (m, gss) => {
  try {
    const cmd = m.body.toLowerCase().trim();

    if (cmd === "antilink on") {
      if (!m.isGroup) return m.reply("*HIS COMMAND CAN ONLY BE USED IN GROUPS!*");
      
      const groupMetadata = await gss.groupMetadata(m.from);
      const participants = groupMetadata.participants;
      const senderAdmin = participants.find(p => p.id === m.sender)?.admin;

      if (!senderAdmin) {
        return m.reply("*🚫 YOU MUST BE AN ADMIN TO ENABLE ANTILINK!*");
      }

      antilinkDB.set(m.from, true);
      return m.reply("*✅ Anti-Link is now ACTIVATED for this group.*\n\n*Regards, Bruce Bera.*");
    }

    if (cmd === "antilink off") {
      if (!m.isGroup) return m.reply("*📛 THIS COMMAND CAN ONLY BE USED IN GROUPS!*");

      const groupMetadata = await gss.groupMetadata(m.from);
      const participants = groupMetadata.participants;
      const senderAdmin = participants.find(p => p.id === m.sender)?.admin;

      if (!senderAdmin) {
        return m.reply("*🚫 YOU MUST BE AN ADMIN TO DISABLE ANTILINK!*");
      }

      antilinkDB.delete(m.from);
      return m.reply("*❌ Anti-Link is now DISABLED for this group.*");
    }

    // **🔹 AUTO-DETECT LINKS AND DELETE THEM**
    if (antilinkDB.get(m.from)) {
      const linkRegex = /(https?:\/\/[^\s]+)/g;
      if (linkRegex.test(m.body)) {
        await gss.sendMessage(m.from, { delete: m.key });
        return m.reply(`*🚫 LINKS ARE NOT ALLOWED IN THIS GROUP!*`);
      }
    }
  } catch (error) {
    console.error("Error in Anti-Link:", error);
    m.reply("*⚠️ An error occurred while processing Anti-Link.*\n\n*Regards, Bruce Bera.*");
  }
};

export default antiLink;
