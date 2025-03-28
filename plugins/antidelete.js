import { enableAntiDelete, disableAntiDelete } from './mydata/antidelete.js'; // Import the anti-delete commands

// Example of the bot's command handler
const commandHandler = async (m, sock) => {
  const cmd = m.body.split(' ')[0].toLowerCase();

  // Enable Anti-Delete Command
  if (cmd === '!antidelete on') {
    enableAntiDelete(); // Enable anti-delete
    await sock.sendMessage(m.from, { text: 'Anti-delete has been enabled.' });
  }

  // Disable Anti-Delete Command
  if (cmd === '!antidelete off') {
    disableAntiDelete(); // Disable anti-delete
    await sock.sendMessage(m.from, { text: 'Anti-delete has been disabled.' });
  }

  // Other commands...
};
//enjoy using mah codes by lord joel 
export default commandHandler;
