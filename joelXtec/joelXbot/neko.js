import axios from 'axios';
import config from '../../config.cjs';

const nekoImage = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const validCommands = ['neko', 'n', 'nk'];

  if (validCommands.includes(cmd)) {
    const imageUrl = `https://files.catbox.moe/6o2lv6.jpg`;
await m.React('⏳'); // React with a loading icon
    await gss.sendMessage(
      m.from,
      {
        image: { url: imageUrl },
        caption: `╭──❍ 「 *ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ ᴠ¹⁰*」❍
├ ᴘʀᴇғɪx :  *${prefix}*
├ ᴍᴏᴅᴇ :  *${mode}*
╰─┬────❍ 
╭─┴❍「 *ᴄᴏɴᴠᴇʀᴛᴏʀ* 」❍
│ ᴀᴛᴛᴘ ʟ 
│ ᴀᴛᴛᴘ2  
│ ᴀᴛᴛᴘ3  
│ ʙɪɴᴀʀʏ  
│ ᴇʙɪɴᴀʀʏ  
│ ᴇᴍᴏᴍɪx  
│ ᴍᴘ3  
╰─┬────❍
╭─┴❍「 *ʀᴇʟɪɢɪᴏɴ* 」❍
│ ʙɪʙʟᴇʙᴏᴏᴋs
│ ʙɪʙʟᴇ 
│ sᴜʀᴀʜ ᴍᴇɴᴜ
│ ǫᴜʀᴀɴᴠɪᴅ
│ ǫᴠɪᴅ
│ sᴜʀᴀʜᴀᴜᴅɪᴏ  
│ sᴜʀᴀʜᴜʀᴅᴜ  
│ ᴀsᴍᴀᴜʟʜᴜsɴᴀ  
│ ᴘʀᴏᴘʜᴇᴛɴᴀᴍᴇ  
╰─┬────❍
╭─┴❍「 *ᴀɪ ᴄᴍᴅs* 」❍
│ ᴀɪ  
│ ʙᴜɢ  
│ ʀᴇᴘᴏʀᴛ  
│ ɢᴘᴛ  
│ ʀᴇᴍɪɴɪ  
╰─┬────❍
╭─┴❍「 *ᴛᴏᴏʟ* 」❍
│ ᴄᴀʟᴄᴜʟᴀᴛᴏʀ  
│ ᴛᴇᴍᴘғɪʟᴇ  
│ ᴄʜᴇᴄᴋᴍᴀɪʟ  
│ ᴛʀᴛ  
│ ᴛᴛs  
╰─┬────❍
╭─┴❍「 *ɢʀᴏᴜᴘ* 」❍
│ ǫᴄ
│ ʟɪɴᴋɢʀᴏᴜᴘ  
│ sᴇᴛᴘᴘɢ  
│ sᴇᴛɴᴀᴍᴇ  
│ sᴇᴛᴅᴇsᴄ  
│ ᴀɴᴛɪʟᴇғᴛ
│ ɢʀᴏᴜᴘ
│ ɢʀᴏᴜᴘɪɴғᴏ
│ ɢᴄssᴇᴛᴛɪɴɢ  
│ ᴡᴇʟᴄᴏᴍᴇ  
│ ᴀᴅᴅ  
│ ᴋɪᴄᴋᴀʟʟ  
│ ᴋɪᴄᴋ  
│ ʜɪᴅᴇᴛᴀɢ  
│ ᴛᴀɢᴀʟʟ  
│ ᴀɴᴛɪʟɪɴᴋ  
│ ᴘʀᴏᴍᴏᴛᴇ  
│ ᴅᴇᴍᴏᴛᴇ  
│ ɢᴇᴛʙɪᴏ  
╰─┬────❍
╭─┴❍「 *ᴅᴏᴡɴʟᴏᴀᴅ* 」❍
│ ᴀᴘᴋ  
│ ғᴀᴄᴇʙᴏᴏᴋ  
│ ᴍᴇᴅɪᴀғɪʀᴇ  
│ ᴘɪɴᴛᴇʀᴇsᴛᴅʟ  
│ ɢᴅʀɪᴠᴇ  
│ ɪɴsᴛᴀ  
│ ᴛɪᴋᴛᴏᴋ  
╰─┬────❍
╭─┴❍「 *ᴘʀᴇᴍɪᴜᴍ* 」❍
│ ʙᴜɢᴍᴇɴᴜ  
│ ᴅᴏᴄʙᴜɢ  
│ ʟᴏᴄᴋᴄʀᴀsʜ  
│ ᴀᴍᴏᴜɴᴛʙᴜɢ <ᴀᴍᴏᴜɴᴛ>  
│ ᴘᴍʙᴜɢ <ɴᴜᴍʙᴇʀ>  
│ ᴅᴇʟʙᴜɢ <ɴᴜᴍʙᴇʀ>  
│ ᴛʀᴏʟʟʙᴜɢ <ɴᴜᴍʙᴇʀ>  
│ ᴅᴏᴄᴜʙᴜɢ <ɴᴜᴍʙᴇʀ>  
│ ᴜɴʟɪᴍɪᴛᴇᴅʙᴜɢ <ɴᴜᴍʙᴇʀ>  
│ ʙᴏᴍʙᴜɢ <ɴᴜᴍʙᴇʀ>  
│ ʟᴀɢʙᴜɢ <ɴᴜᴍʙᴇʀ>  
│ ɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>  
│ ᴅᴇʟɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>  
│ ᴛʀᴏʟʟɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>  
│ ʟᴀʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>  
│ ʙᴏᴍʙɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>  
│ ᴜɴʟɪᴍɪᴛᴇᴅɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>  
│ ᴅᴏᴄᴜɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>  
╰─┬────❍
╭─┴❍「 *ᴅᴏᴡɴʟᴏᴀᴅ* 」❍
│ ᴘʟᴀʏ
│ sᴏɴɢ
│ᴠɪᴅᴇᴏ
│ sᴍᴇᴅɪᴀ  
│ ᴍᴏᴠɪᴇ
│ ɪᴍᴀɢᴇ  
│ ᴘɪɴᴛᴇʀᴇsᴛ 
│ ʏᴛs
│ ʟʏʀɪᴄs 
╰─┬────❍
╭─┴❍「 *ᴍᴀɪɴ* 」❍
│ ᴘɪɴɢ  
│ ᴀʟɪᴠᴇ  
│ ᴏᴡɴᴇʀ 
│ sᴜᴅᴏ 
│ ᴍᴇɴᴜ  
│ ɪɴғᴏʙᴏᴛ  
╰─┬────❍
╭─┴❍「 *ᴏᴡɴᴇʀ* 」❍
│ ᴠᴠ  
│ ᴠᴠ1  
│ ᴠᴠ2  
│ ᴠᴠ3  
│ ᴜᴘᴅᴀᴛᴇ 
│ ᴜᴘᴅᴀᴛᴇɴᴏᴡ
│ ᴘᴀɪʀ
│ ғᴏʀᴡᴀʀᴅ 
│ ɢᴇᴛᴀʟʟ
│ ᴊɪᴅ
│ ᴊᴏɪɴ  
│ ʟᴇᴀᴠᴇ  
│ ʙʟᴏᴄᴋ  
│ ᴜɴʙʟᴏᴄᴋ  
│ ᴀʟʟᴄᴍᴅs 
│ ᴀɴᴛɪᴀʟʟ  
│ sᴇᴛsᴛᴀᴛᴜs  
│ ᴀᴜᴛᴏʙɪᴏ  
│ ᴀᴜᴛᴏᴛʏᴘɪɴɢ  
│ ᴀʟᴡᴀʏsᴏɴʟɪɴᴇ  
│ ᴀᴜᴛᴏʀᴇᴀᴅ  
│ ᴀᴜᴛᴏsᴠɪᴇᴡ  
╰─┬────❍
╭─┴❍「 *sᴛᴀʟᴋ* 」❍
│ ᴛʀᴜᴇᴄᴀʟʟᴇʀ  
│ ɪɴsᴛᴀsᴛᴀʟᴋ 
│ ᴛɪᴋᴛᴏᴋsᴛᴀʟᴋ  
│ ɴᴘᴍssᴛᴀʟᴋ  
│ ɢɪᴛʜᴜʙsᴛᴀʟᴋ  
╰─┬────❍
╭─┴❍「 *ᴏᴛʜᴇʀ* 」❍
│ sᴀᴘᴋ  
│ ᴜʀʟ  
│ ᴜʀʟ2  
│ ᴛᴏᴜʀʟ  
│ ᴘᴀɪʀ  
│ sᴜᴘᴘᴏʀᴛ  
│ ғᴏʟʟᴏᴡ  
│ ᴄʜᴀɴɴᴇʟ  
│ sᴜᴘᴘᴏʀᴛ  
│ ғᴏʟʟᴏᴡ  
│ ᴄʜᴀɴɴᴇʟ  
│ ɪɴᴄ  
│ ɪ  
│ ᴀᴘᴘ  
│ ᴀᴘᴘsᴇᴀʀᴄʜ  
│ ᴘʟᴀʏsᴛᴏʀᴇ  
│ ᴄʜᴀɴɴᴇʟ  
│ sᴜᴘᴘᴏʀᴛ  
│ ᴊᴏᴇʟ  
│ ᴄʜᴀᴛ  
│ ss  
╰─┬────❍
╭─┴❍「 *ɴᴇᴡ* 」❍
│ sᴄᴏʀᴇ    
│ sɴᴀᴋᴠɪᴅ 
│ ᴡᴇᴀᴛʜᴇʀ
│ ᴀᴅᴅᴠᴀʀ
│ sᴜᴅᴏ| joel
│ ǫʀ
│ ʀᴇᴀᴅǫʀ
│ ᴘʀᴏғɪʟᴇ 
│ sʜᴏʀᴛᴇɴᴜʀʟ  
│ ɢɪᴠᴇᴛᴇxᴛ  
│ ғᴀɴᴄʏ   
╰─┬────❍
╭─┴❍「 *sᴀʏ* 」❍
│ sᴀʏ  
│ ᴛᴛs  
│ ʙᴀss  
│ ʙʟᴏᴡɪɴ  
│ ᴅᴇᴇᴘ  
│ ᴇᴀʀʀᴀᴘᴇ  
│ ғᴀsᴛ  
│ ғᴀᴛ  
│ ɴɪɢʜᴛᴛɪᴍᴇ  
│ ʀᴇᴠᴇʀsᴇ  
│ ʀᴏʙᴏᴛ  
│ sʟᴏᴡ  
│ sᴍᴏᴏᴛʜ  
│ ᴛʏᴘᴀɪ  
╰─┬────❍
╭─┴❍「 *ʟᴏɢᴏ* 」❍
│ ʟᴏɢᴏ  
│ ʟᴏɢᴏ1  
│ ʟᴏɢᴏ2  
│ ʟᴏɢᴏ3  
│ ʟᴏɢᴏ4  
│ ʟᴏɢᴏ5
│ ʟᴏɢᴏ6  
│ ʟᴏɢᴏ7  
│ ʟᴏɢᴏ8  
│ ʟᴏɢᴏ9  
│ ʟᴏɢᴏ10  
│ ʟᴏɢᴏ11  
│ ʟᴏɢᴏ12  
│ ʟᴏɢᴏ13  
│ ʟᴏɢᴏ14  
│ ʟᴏɢᴏ15  
│ ʟᴏɢᴏ16  
│ ʟᴏɢᴏ17  
│ ʟᴏɢᴏ18  
│ ʟᴏɢᴏ19  
╰─┬────❍
╭─┴❍「 *ᴡᴀɪғᴜ* 」❍
│ ʜɪɢʜғɪᴠᴇ  
│ ɢʟᴏᴍᴘ  
│ ʜᴀɴᴅʜᴏʟᴅ  
│ sʜɪɴᴏʙᴜ  
│ ᴄᴜᴅᴅʟᴇ  
│ ᴄʀɪɴɢᴇ  
│ sᴀᴅ  
│ ʜᴀᴘᴘʏ  
│ ᴅᴀɴᴄᴇ  
│ sᴍᴜɢ  
│ ʙʟᴜsʜ  
│ ᴀᴡᴏ  
│ ᴡᴀᴠᴇ  
│ sᴍɪʟᴇ  
╰────────────❍
*${config.CAPTION}*`;

    await m.React('☄️'); // React with a success icon

    sock.sendMessage(
      m.from,
      {
        text: aliveMessage,
        contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363317462952356@newsletter',
            newsletterName: "ᴊᴏᴇʟ xᴅ ʙᴏᴛ",
            serverMessageId: -1,
          },
          forwardingScore: 999, // Score to indicate it has been forwarded
          externalAdReply: {
            title: "ᴊᴏᴇʟ xᴅ ʙᴏᴛ ᴠ ⁷",
            body: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ",
            thumbnailUrl: 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/joelXbot.jpg', // Add thumbnail URL if required
            sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K', // Add source URL if necessary
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
  }
};
//codes by lord joel 
export default nekoImage;
    
