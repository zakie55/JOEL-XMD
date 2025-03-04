import config from '../../config.cjs';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import fs from 'fs';
import path from 'path';

const play2 = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';
  const query = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "play2") {
    if (!query) return m.reply("❌ *Please provide a search query!*");

    await m.react('⏳'); // React with loading icon

    try {
      const searchResults = await yts(query);
      if (!searchResults.videos.length) return m.reply("❌ *No results found!*");

      const video = searchResults.videos[0]; // First result
      const captionMessage = `
╭━━━〔 *Sarkar-MD YouTube Search* 〕━━━
┃▸ *Title:* ${video.title}
┃▸ *Duration:* ${video.timestamp}
┃▸ *Views:* ${video.views}
┃▸ *Channel:* ${video.author.name}
╰━━━━━━━━━━━━━━━━━━
📥 *Choose an option to download:*
1️⃣ *Video*
2️⃣ *Audio*
3️⃣ *Video (Document)*
4️⃣ *Audio (Document)*
`;

      const sentMessage = await sock.sendMessage(m.from, {
        image: { url: video.thumbnail },
        caption: captionMessage
      }, { quoted: m });

      const messageID = sentMessage.key.id;
      const videoUrl = video.url;

      sock.ev.on("messages.upsert", async (message) => {
        const receivedMessage = message.messages[0];
        if (!receivedMessage.message) return;

        const userResponse = receivedMessage.message.conversation || receivedMessage.message.extendedTextMessage?.text;
        const chatID = receivedMessage.key.remoteJid;
        const isReplyToBotMessage = receivedMessage.message.extendedTextMessage &&
          receivedMessage.message.extendedTextMessage.contextInfo.stanzaId === messageID;

        if (isReplyToBotMessage) {
          await sock.sendMessage(chatID, { react: { text: '⬇️', key: receivedMessage.key } });

          let format, caption, fileType, mimeType;
          if (userResponse === '1') {
            format = { quality: 'highest', filter: 'videoandaudio' };
            fileType = 'video';
            caption = "📥 *Downloaded in Video Format*";
            mimeType = "video/mp4";
          } else if (userResponse === '2') {
            format = { quality: 'highestaudio', filter: 'audioonly' };
            fileType = 'audio';
            caption = "📥 *Downloaded in Audio Format*";
            mimeType = "audio/mpeg";
          } else if (userResponse === '3') {
            format = { quality: 'highest', filter: 'videoandaudio' };
            fileType = 'document';
            caption = "📥 *Downloaded as Video Document*";
            mimeType = "video/mp4";
          } else if (userResponse === '4') {
            format = { quality: 'highestaudio', filter: 'audioonly' };
            fileType = 'document';
            caption = "📥 *Downloaded as Audio Document*";
            mimeType = "audio/mpeg";
          } else {
            return m.reply("❌ *Invalid selection! Please reply with 1, 2, 3, or 4.*");
          }

          const filePath = path.resolve(`./temp/${fileType}_${Date.now()}.${fileType === 'audio' ? 'mp3' : 'mp4'}`);
          const stream = ytdl(videoUrl, format).pipe(fs.createWriteStream(filePath));

          stream.on("finish", async () => {
            const mediaMessage = fileType === 'document'
              ? { document: fs.readFileSync(filePath), mimetype: mimeType, fileName: `Sarkar-MD_${fileType}.${fileType === 'audio' ? 'mp3' : 'mp4'}`, caption }
              : { [fileType]: fs.readFileSync(filePath), mimetype: mimeType, caption };

            await sock.sendMessage(chatID, mediaMessage, { quoted: receivedMessage });

            fs.unlinkSync(filePath); // Delete file after sending
          });

          stream.on("error", async (err) => {
            console.error("Download Error:", err);
            m.reply("❌ *An error occurred while downloading the file.*");
          });
        }
      });

    } catch (error) {
      console.error("Error:", error);
      return m.reply("❌ *An error occurred while processing your request.*");
    }
  }
};

export default play2;
