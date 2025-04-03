
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
          renderLargerThumbnail: false,
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
      const caption = `
╭─❍「 ᴄᴏɴᴠᴇʀᴛᴏʀ 」❍
│▸ attp l
│▸ attp2
│▸ attp3
│▸ binary
│▸ ebinary
│▸ emotemix
│▸ mp3
╰─┬────❍
╭─┴❍「  ʀᴇʟɪɢɪᴏɴ」 ❍
│▸ Biblebooks
│▸ Bible
│▸ Surah Menu
│▸ Quranvid
│▸ qvid
│▸ qimg
│▸ quranimage
│▸ SurahAudio
│▸ SurahUrdu
│▸ AsmaulHusna
│▸ Prophetname
╰─┬────❍
╭─┴❍「ᴇᴄᴏɴᴏᴍʏ 」❍
│▸ economy
│▸ balance
│▸ daily
│▸ leaderboard
│▸ transfer
│▸ earn <amount>
│▸ spend <amount>
│▸ deposit <amount>
│▸ withdraw <amount>
│▸ transfer <recipient> <amnt>
╰─┬────❍
╭─┴❍「 ᴀɪ ᴄᴍᴅs ❍
│▸ AI
│▸ bug
│▸ report
│▸ GPT
│▸ remini
╰─┬────❍
╭─┴❍「 ᴛᴏᴏʟ」 ❍
│▸ calculator
│▸ tempfile
│▸ checkmail
│▸ trt
│▸ tts
╰─┬────❍
╭─┴❍「 ᴊᴏᴋᴇ 」 ❍
│▸ joke
│▸ advice
│▸ meme
│▸ rank
│▸ quote
╰─┬────❍
╭─┴❍「ɢʀᴏᴜᴘ ❍
│▸ qcc
│▸ linkgroup
│▸ setppg
│▸ setname
│▸ setdesc
│▸ antibot
│▸ antileft
│▸ group
│▸ groupinfo
│▸ gcsetting
│▸ welcome
│▸ add
│▸ kickall
│▸ kick
│▸ hidetag
│▸ tagadmin
│▸ tagnotadmin
│▸ tagall
│▸ antilink
│▸ promote
│▸ demote
│▸ Vcf
│▸ poll
│▸ getbio
╰─┬────❍
╭─┴❍「 ᴅᴏᴡɴʟᴏᴀᴅ」❍
│▸ apk
│▸ facebook
│▸ mediafire
│▸ pinterestdl
│▸ gdrive
│▸ insta
│▸ tiktok
╰─┬────❍
╭─┴❍「ᴘʀᴇᴍɪᴜᴍ」 ❍
│▸ bugmenu
│▸ docbug
│▸ lockcrash
│▸ amountbug <amount>
│▸ pmbug <number>
│▸ delbug <number>
│▸ trollbug <number>
│▸ docubug <number>
│▸ unlimitedbug <number>
│▸ bombbug <number>
│▸ lagbug <number>
│▸ gcbug <grouplink>
│▸ delgcbug <grouplink>
│▸ trollgcbug <grouplink>
│▸ labug <grouplink>
│▸ bombgcbug <grouplink>
│▸ unlimitedgcbug <grouplink>
│▸ docugcbug <grouplink>
╰─┬────❍
╭─┴❍「 ᴅᴏᴡɴʟᴏᴀᴅ」❍ 
│▸ play
│▸ song
│▸ video
│▸ smedia
│▸ movie
│▸ image
│▸ pinterest
│▸ yts
│▸ lyrics
╰─┬────❍
╭─┴❍「 ᴍᴀɪɴ 」❍
│▸ ping
│▸ alive
│▸ owner
│▸ sudo
│▸ menu
│▸ infobot
╰─┬────❍
╭─┴❍「 ᴏᴡɴᴇʀ 」❍
│▸ vv
│▸ vv1
│▸ vv2
│▸ vv3
│▸ update
│▸ updatenow
│▸ pair
│▸ forward
│▸ getall
│▸ jid
│▸ join
│▸ leave
│▸ block
│▸ unblock
│▸ allcmds
│▸ antiall
│▸ setstatus
│▸ autobio
│▸ autotyping
│▸ alwaysonline
│▸ autoread
│▸ autosview
╰─┬────❍
╭─┴❍「 sᴛᴀʟᴋ 」
│▸ truecaller
│▸ instastalk
│▸ tiktokstalk
│▸ npmstalk
│▸ githubstalk
╰─┬────❍
╭─┴❍「 ᴏᴛʜᴇʀ ❍ 
│▸ sapk
│▸ url
│▸ url2
│▸ tourl
│▸ support
│▸ follow
│▸ channel
│▸ inc
│▸ i
│▸ app
│▸ appsearch
│▸ playstore
│▸ channel
│▸ support
│▸ joel
│▸ chat
│▸ ss
╰─┬────❍
╭─┴❍「 ɴᴇᴡ ❍
│▸ score
│▸ snakvid
│▸ weather
│▸ qr
│▸ readqr
│▸ profile
│▸ shortenurl
│▸ givetext
│▸ fancy
╰─┬────❍
╭─┴❍「 sᴀʏ ❍
│▸ say
│▸ tts
│▸ bass
│▸ blowin
│▸ deep
│▸ earrape
│▸ fast
│▸ fat
│▸ nighttime
│▸ reverse
│▸ robot
│▸ slow
│▸ smooth
│▸ typai
╰─┬────❍
╭─┴❍「 ʟᴏɢᴏ ❍
│▸ logo
│▸ logo1
│▸ logo2
│▸ logo3
│▸ logo4
│▸ logo5
│▸ logo6
│▸ logo7
│▸ logo8
│▸ logo9
│▸ logo10
│▸ logo11
│▸ logo12
│▸ logo13
│▸ logo14
│▸ logo15
│▸ logo16
│▸ logo17
│▸ logo18
│▸ logo19
╰─┬────❍
╭─┴❍「 ʜᴇɴᴛᴀɪ」 ❍
│▸  hwaifu  
│▸  trap  
│▸  blowjob
│▸  neko
│▸  hneko
│▸ couplepp
╰─┬────❍
╭─┴❍「 ᴡᴀɪғᴜ」 ❍
│▸ neko
│▸ couplepp
│▸ cosplay
│▸ megumin
│▸ shinobu
╰─┬────❍
╭─┴❍「 ʀᴇᴀᴄᴛɪᴏɴs」 ❍
│▸ highfive
│▸ glomp
│▸ handhold
│▸ shinobu
│▸ cuddle
│▸ cringe
│▸ sad
│▸ happy
│▸ dance
│▸ smug
│▸ blush
│▸ awo
│▸ wave
│▸ smile
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
            renderLargerThumbnail: false,
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




