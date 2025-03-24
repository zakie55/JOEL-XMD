import config from '../../config.cjs';

const invite = async (m, gss) => {
  try {
    const prefix = config.PREFIX;
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();

    const validCommands = ['invite', 'add'];

    // Check if the command is valid
    if (!validCommands.includes(cmd)) {
      return m.reply(`Invalid command. Use ${prefix}invite or ${prefix}add.`);
    }

    // Example action for "invite"
    if (cmd === 'invite') {
      if (!text) {
        return m.reply('Please provide an invite link or information.');
      }

      // Perform action with the invite link or info
      // Replace this with your actual invite logic
      return m.reply(`You have been invited with the link: ${text}`);
    }

    // Example action for "add"
    if (cmd === 'add') {
      if (!text) {
        return m.reply('Please provide the information to add.');
      }

      // Perform action with the add logic
      // Replace this with your actual add logic
      return m.reply(`Added: ${text}`);
    }

  } catch (error) {
    console.error('Error processing the command:', error);
    return m.reply('An error occurred while processing your command.');
  }
};

export default invite;
