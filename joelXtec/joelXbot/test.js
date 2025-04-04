import config from '../../config.cjs'; // Ensure this matches your project setup

const ownerLocation = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  try {
    if (cmd === "test") {
      // Coordinates for the owner's location (example: replace with actual coordinates)
      const ownerLatitude = 24.121231;
      const ownerLongitude = 55.1121221;

      // Send owner's location
      await zk.sendMessage(
        m.from,
        { 
          location: { 
            degreesLatitude: ownerLatitude, 
            degreesLongitude: ownerLongitude 
          }
        }
      );

      // Optional: Send a text message to let the user know the location was sent
      await zk.sendMessage(
        m.from,
        { text: 'Here is the owner\'s location.' },
        { quoted: m }
      );
    }
  } catch (error) {
    console.error("Error handling owner command:", error);
    // Optionally send a fallback response in case of error
    await zk.sendMessage(
      m.from,
      { text: "Sorry, there was an error processing your request." },
      { quoted: m }
    );
  }
};
//JOEL XMD BOT DEVELOPED BY LORD JOEL AMAXMAI
export default ownerLocation;
