import config from '../../config.cjs'; // Importing the config file

const replyMessage = async (m, gss) => {
  const prefix = config.PREFIX;  // Getting the prefix from config
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const lastSentMessages = {};  // Store last sent message by user ID

  if (cmd === 'reply') {
    // Ensure the user provided follow-up text
    if (!text) return m.reply(`Example: ${prefix}reply hello`);

    // Check if there is a previously sent message to reply to
    if (!lastSentMessages[m.sender]) {
      return m.reply("Sorry, I couldn't find a message from you to reply to.");
    }

    // Retrieve the original message content
    const originalMessage = lastSentMessages[m.sender];

    // Send the original message as a reply
    await gss.sendMessage(m.chat, { text: originalMessage }, { quoted: m });

    // Send the follow-up text
    await gss.sendMessage(m.chat, { text: text }, { quoted: m });

    m.reply("Your reply has been sent.");
  }

  // Store the sent message for later replies
  if (m.body) {
    lastSentMessages[m.sender] = m.body;  // Store the last sent message content by user
  }
};

export default replyMessage;
