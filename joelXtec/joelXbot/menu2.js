
import config from '../../config.cjs';

const LogoCmd = async (m, sock) => {
  const prefix = config.PREFIX;
  const pushName = m.pushName || 'User';

  // Extract the command name (should only be "logo13")
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

  // Handle the "logo13" command
  if (cmd === "menu2") {
    // Use the fixed text "joel xmd"
    const text = "joel xmd";

    try {
      // React to the user that processing has started
      await sock.sendMessage(m.from, { react: { text: "⏳", key: m.key } });

      // The logo URL is static
      const logoUrl = 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/joelXbot.jpg';
      const caption = `╭───────────────━⊷
║ ᴊᴏᴇʟ-xᴍᴅ ᴍᴀɪɴ ᴍᴇɴᴜ
╰───────────────━⊷
╭───────────────━⊷
║🤖 *ɴᴀᴍᴇ:* ᴊᴏᴇʟ-xᴍᴅ
║🌚 *ᴘʀᴇғɪx:*  ${prefix}
║💫 *ᴛʜᴇᴍᴇ:*  ʝσєℓ 
║🤖 *ᴍᴏᴅᴇ:*  ${mode}
║❗ *sᴛᴀᴛᴜs:*  ᴏɴʟɪɴᴇ
║👤 *ᴏᴡɴᴇʀ:* ʟᴏʀᴅ ᴊᴏᴇʟ
╰───────────────━⊷

╭─❍「 ᴄᴏɴᴠᴇʀᴛᴏʀ 」❍
│▸ ᴀᴛᴛᴘ ʟ
│▸ ᴀᴛᴛᴘ2
│▸ ᴀᴛᴛᴘ3
│▸ ʙɪɴᴀʀʏ
│▸ ᴇʙɪɴᴀʀʏ
│▸ ᴇᴍᴏᴛᴇᴍɪx
│▸ ᴍᴘ3
╰─┬────❍
╭─┴❍「  ʀᴇʟɪɢɪᴏɴ」 ❍
│▸ ʙɪʙʟᴇʙᴏᴏᴋs
│▸ ʙɪʙʟᴇ
│▸ sᴜʀᴀʜ ᴍᴇɴᴜ
│▸ ᴏ̨ᴜʀᴀɴᴠɪᴅ
│▸ ᴏ̨ᴠɪᴅ
│▸ ᴏ̨ɪᴍɢ
│▸ ᴏ̨ᴜʀᴀɴɪᴍᴀɢᴇ
│▸ sᴜʀᴀʜᴀᴜᴅɪᴏ
│▸ sᴜʀᴀʜᴜʀᴅᴜ
│▸ ᴀsᴍᴀᴜʟʜᴜsɴᴀ
│▸ ᴘʀᴏᴘʜᴇᴛɴᴀᴍᴇ
╰─┬────❍
╭─┴❍「ᴇᴄᴏɴᴏᴍʏ 」❍
│▸ ᴇᴄᴏɴᴏᴍʏ
│▸ ʙᴀʟᴀɴᴄᴇ
│▸ ᴅᴀɪʟʏ
│▸ ʟᴇᴀᴅᴇʀʙᴏᴀʀᴅ
│▸ ᴛʀᴀɴsғᴇʀ
│▸ ᴇᴀʀɴ <ᴀᴍᴏᴜɴᴛ>
│▸ sᴘᴇɴᴅ <ᴀᴍᴏᴜɴᴛ>
│▸ ᴅᴇᴘᴏsɪᴛ <ᴀᴍᴏᴜɴᴛ>
│▸ ᴡɪᴛʜᴅʀᴀᴡ <ᴀᴍᴏᴜɴᴛ>
│▸ ᴛʀᴀɴsғᴇʀ <ʀᴇᴄɪᴘɪᴇɴᴛ> <ᴀᴍɴᴛ>
╰─┬────❍
╭─┴❍「 ᴀɪ ᴄᴍᴅs ❍
│▸ ᴀɪ
│▸ ʙᴜɢ
│▸ ʀᴇᴘᴏʀᴛ
│▸ ɢᴘᴛ
│▸ ʀᴇᴍɪɴɪ
╰─┬────❍
╭─┴❍「 ᴛᴏᴏʟ」 ❍
│▸ ᴄᴀʟᴄᴜʟᴀᴛᴏʀ
│▸ ᴛᴇᴍᴘғɪʟᴇ
│▸ ᴄʜᴇᴄᴋᴍᴀɪʟ
│▸ ᴛʀᴛ
│▸ ᴛᴛs
╰─┬────❍
╭─┴❍「 ᴊᴏᴋᴇ 」 ❍
│▸ ᴊᴏᴋᴇ
│▸ ᴀᴅᴠɪᴄᴇ
│▸ ᴍᴇᴍᴇ
│▸ ʀᴀɴᴋ
│▸ ᴏ̨ᴜᴏᴛᴇ
╰─┬────❍
╭─┴❍「ɢʀᴏᴜᴘ ❍
│▸ ᴏ̨ᴄᴄ
│▸ ʟɪɴᴋɢʀᴏᴜᴘ
│▸ sᴇᴛᴘᴘɢ
│▸ sᴇᴛɴᴀᴍᴇ
│▸ sᴇᴛᴅᴇsᴄ
│▸ ᴀɴᴛɪʙᴏᴛ
│▸ ᴀɴᴛɪʟᴇғᴛ
│▸ ɢʀᴏᴜᴘ
│▸ ɢʀᴏᴜᴘɪɴғᴏ
│▸ ɢᴄsᴇᴛᴛɪɴɢ
│▸ ᴡᴇʟᴄᴏᴍᴇ
│▸ ᴀᴅᴅ
│▸ ᴋɪᴄᴋᴀʟʟ
│▸ ᴋɪᴄᴋ
│▸ ʜɪᴅᴇᴛᴀɢ
│▸ ᴛᴀɢᴀᴅᴍɪɴ
│▸ ᴛᴀɢɴᴏᴛᴀᴅᴍɪɴ
│▸ ᴛᴀɢᴀʟʟ
│▸ ᴀɴᴛɪʟɪɴᴋ
│▸ ᴘʀᴏᴍᴏᴛᴇ
│▸ ᴅᴇᴍᴏᴛᴇ
│▸ ᴠᴄғ
│▸ ᴘᴏʟʟ
│▸ ɢᴇᴛʙɪᴏ
╰─┬────❍
╭─┴❍「 ᴅᴏᴡɴʟᴏᴀᴅ」❍
│▸ ᴀᴘᴋ
│▸ ғᴀᴄᴇʙᴏᴏᴋ
│▸ ᴍᴇᴅɪᴀғɪʀᴇ
│▸ ᴘɪɴᴛᴇʀᴇsᴛᴅʟ
│▸ ɢᴅʀɪᴠᴇ
│▸ ɪɴsᴛᴀ
│▸ ᴛɪᴋᴛᴏᴋ
╰─┬────❍
╭─┴❍「ᴘʀᴇᴍɪᴜᴍ」 ❍
│▸ ʙᴜɢᴍᴇɴᴜ
│▸ ᴅᴏᴄʙᴜɢ
│▸ ʟᴏᴄᴋᴄʀᴀsʜ
│▸ ᴀᴍᴏᴜɴᴛʙᴜɢ <ᴀᴍᴏᴜɴᴛ>
│▸ ᴘᴍʙᴜɢ <ɴᴜᴍʙᴇʀ>
│▸ ᴅᴇʟʙᴜɢ <ɴᴜᴍʙᴇʀ>
│▸ ᴛʀᴏʟʟʙᴜɢ <ɴᴜᴍʙᴇʀ>
│▸ ᴅᴏᴄᴜʙᴜɢ <ɴᴜᴍʙᴇʀ>
│▸ ᴜɴʟɪᴍɪᴛᴇᴅʙᴜɢ <ɴᴜᴍʙᴇʀ>
│▸ ʙᴏᴍʙʙᴜɢ <ɴᴜᴍʙᴇʀ>
│▸ ʟᴀɢʙᴜɢ <ɴᴜᴍʙᴇʀ>
│▸ ɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>
│▸ ᴅᴇʟɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>
│▸ ᴛʀᴏʟʟɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>
│▸ ʟᴀʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>
│▸ ʙᴏᴍʙɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>
│▸ ᴜɴʟɪᴍɪᴛᴇᴅɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>
│▸ ᴅᴏᴄᴜɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>
╰─┬────❍
╭─┴❍「 ᴅᴏᴡɴʟᴏᴀᴅ」❍ 
│▸ ᴘʟᴀʏ
│▸ sᴏɴɢ
│▸ ᴠɪᴅᴇᴏ
│▸ sᴍᴇᴅɪᴀ
│▸ ᴍᴏᴠɪᴇ
│▸ ɪᴍᴀɢᴇ
│▸ ᴘɪɴᴛᴇʀᴇsᴛ
│▸ ʏᴛs
│▸ ʟʏʀɪᴄs
╰─┬────❍
╭─┴❍「 ᴍᴀɪɴ 」❍
│▸ ᴘɪɴɢ
│▸ ᴀʟɪᴠᴇ
│▸ ᴏᴡɴᴇʀ
│▸ sᴜᴅᴏ
│▸ ᴍᴇɴᴜ
│▸ ɪɴғᴏʙᴏᴛ
╰─┬────❍
╭─┴❍「 ᴏᴡɴᴇʀ 」❍
│▸ ᴠᴠ
│▸ ᴠᴠ1
│▸ ᴠᴠ2
│▸ ᴠᴠ3
│▸ ᴜᴘᴅᴀᴛᴇ
│▸ ᴜᴘᴅᴀᴛᴇɴᴏᴡ
│▸ ᴘᴀɪʀ
│▸ ғᴏʀᴡᴀʀᴅ
│▸ ɢᴇᴛᴀʟʟ
│▸ ᴊɪᴅ
│▸ ᴊᴏɪɴ
│▸ ʟᴇᴀᴠᴇ
│▸ ʙʟᴏᴄᴋ
│▸ ᴜɴʙʟᴏᴄᴋ
│▸ ᴀʟʟᴄᴍᴅs
│▸ ᴀɴᴛɪᴀʟʟ
│▸ sᴇᴛsᴛᴀᴛᴜs
│▸ ᴀᴜᴛᴏʙɪᴏ
│▸ ᴀᴜᴛᴏᴛʏᴘɪɴɢ
│▸ ᴀʟᴡᴀʏsᴏɴʟɪɴᴇ
│▸ ᴀᴜᴛᴏʀᴇᴀᴅ
│▸ ᴀᴜᴛᴏsᴠɪᴇᴡ
╰─┬────❍
╭─┴❍「 sᴛᴀʟᴋ 」
│▸ ᴛʀᴜᴇᴄᴀʟʟᴇʀ
│▸ ɪɴsᴛᴀsᴛᴀʟᴋ
│▸ ᴛɪᴋᴛᴏᴋsᴛᴀʟᴋ
│▸ ɴᴘᴍsᴛᴀʟᴋ
│▸ ɢɪᴛʜᴜʙsᴛᴀʟᴋ
╰─┬────❍
╭─┴❍「 ᴏᴛʜᴇʀ ❍ 
│▸ sᴀᴘᴋ
│▸ ᴜʀʟ
│▸ ᴜʀʟ2
│▸ ᴛᴏᴜʀʟ
│▸ sᴜᴘᴘᴏʀᴛ
│▸ ғᴏʟʟᴏᴡ
│▸ ᴄʜᴀɴɴᴇʟ
│▸ ɪɴᴄ
│▸ ɪ
│▸ ᴀᴘᴘ
│▸ ᴀᴘᴘsᴇᴀʀᴄʜ
│▸ ᴘʟᴀʏsᴛᴏʀᴇ
│▸ ᴄʜᴀɴɴᴇʟ
│▸ sᴜᴘᴘᴏʀᴛ
│▸ ᴊᴏᴇʟ
│▸ ᴄʜᴀᴛ
│▸ ss
╰─┬────❍
╭─┴❍「 ɴᴇᴡ ❍
│▸ sᴄᴏʀᴇ
│▸ sɴᴀᴋᴠɪᴅ
│▸ ᴡᴇᴀᴛʜᴇʀ
│▸ ᴏ̨ʀ
│▸ ʀᴇᴀᴅᴏ̨ʀ
│▸ ᴘʀᴏғɪʟᴇ
│▸ sʜᴏʀᴛᴇɴᴜʀʟ
│▸ ɢɪᴠᴇᴛᴇxᴛ
│▸ ғᴀɴᴄʏ
╰─┬────❍
╭─┴❍「 sᴀʏ ❍
│▸ sᴀʏ
│▸ ᴛᴛs
│▸ ʙᴀss
│▸ ʙʟᴏᴡɪɴ
│▸ ᴅᴇᴇᴘ
│▸ ᴇᴀʀʀᴀᴘᴇ
│▸ ғᴀsᴛ
│▸ ғᴀᴛ
│▸ ɴɪɢʜᴛᴛɪᴍᴇ
│▸ ʀᴇᴠᴇʀsᴇ
│▸ ʀᴏʙᴏᴛ
│▸ sʟᴏᴡ
│▸ sᴍᴏᴏᴛʜ
│▸ ᴛʏᴘᴀɪ
╰─┬────❍
╭─┴❍「 ʟᴏɢᴏ ❍
│▸ ʟᴏɢᴏ
│▸ ʟᴏɢᴏ1
│▸ ʟᴏɢᴏ2
│▸ ʟᴏɢᴏ3
│▸ ʟᴏɢᴏ4
│▸ ʟᴏɢᴏ5
│▸ ʟᴏɢᴏ6
│▸ ʟᴏɢᴏ7
│▸ ʟᴏɢᴏ8
│▸ ʟᴏɢᴏ9
│▸ ʟᴏɢᴏ10
│▸ ʟᴏɢᴏ11
│▸ ʟᴏɢᴏ12
│▸ ʟᴏɢᴏ13
│▸ ʟᴏɢᴏ14
│▸ ʟᴏɢᴏ15
│▸ ʟᴏɢᴏ16
│▸ ʟᴏɢᴏ17
│▸ ʟᴏɢᴏ18
│▸ ʟᴏɢᴏ19
╰─┬────❍
╭─┴❍「 ʜᴇɴᴛᴀɪ」 ❍
│▸  ʜᴡᴀɪғᴜ  
│▸  ᴛʀᴀᴘ  
│▸  ʙʟᴏᴡᴊᴏʙ
│▸  ɴᴇᴋᴏ
│▸  ʜɴᴇᴋᴏ
│▸ ᴄᴏᴜᴘʟᴇᴘᴘ
╰─┬────❍
╭─┴❍「 ᴡᴀɪғᴜ」 ❍
│▸ ɴᴇᴋᴏ
│▸ ᴄᴏᴜᴘʟᴇᴘᴘ
│▸ ᴄᴏsᴘʟᴀʏ
│▸ ᴍᴇɢᴜᴍɪɴ
│▸ sʜɪɴᴏʙᴜ
╰─┬────❍
╭─┴❍「 ʀᴇᴀᴄᴛɪᴏɴs」 ❍
│▸ ʜɪɢʜғɪᴠᴇ
│▸ ɢʟᴏᴍᴘ
│▸ ʜᴀɴᴅʜᴏʟᴅ
│▸ sʜɪɴᴏʙᴜ
│▸ ᴄᴜᴅᴅʟᴇ
│▸ ᴄʀɪɴɢᴇ
│▸ sᴀᴅ
│▸ ʜᴀᴘᴘʏ
│▸ ᴅᴀɴᴄᴇ
│▸ sᴍᴜɢ
│▸ ʙʟᴜsʜ
│▸ ᴀᴡᴏ
│▸ ᴡᴀᴠᴇ
│▸ sᴍɪʟᴇ
╰─────────────❍
*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ*`;

      // Create a message payload with the image and caption
      const messagePayload = {
        image: { url: logoUrl },
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

      // Send the image message
      await sock.sendMessage(m.from, messagePayload, { quoted: m });
      // React to indicate success
      await sock.sendMessage(m.from, { react: { text: "✅", key: m.key } });
    } catch (error) {
      console.error(error);
      await sendCommandMessage("⚠️ An error occurred while sending the menu. Please try again later!");
    }
  }
};

export default LogoCmd;
