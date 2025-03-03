import moment from 'moment-timezone';
import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import config from '../../config.cjs';

const allMenu = async (m, sock) => {
  const prefix = config.PREFIX;
  const mode = config.MODE;
  const pushName = m.pushName || 'User';

  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';
    
        // Calculate uptime
    const uptimeSeconds = process.uptime();
    const days = Math.floor(uptimeSeconds / (24 * 3600));
    const hours = Math.floor((uptimeSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeSeconds % 60);
    //realtime function
        const realTime = moment().tz("Tanzania/Dodoma").format("HH:mm:ss");
// pushwish function
    let pushwish = "";
    
        if (realTime < "05:00:00") {
  pushwish = `𝙶𝙾𝙾𝙳 𝙼𝙾𝚁𝙽𝙸𝙽𝙶 🌄`;
} else if (realTime < "11:00:00") {
  pushwish = `𝙶𝙾𝙾𝙳 𝙼𝙾𝚁𝙽𝙸𝙽𝙶 🌄`;
} else if (realTime < "15:00:00") {
  pushwish = `𝙶𝙾𝙾𝙳 𝙰𝙵𝚃𝙴𝚁𝙽𝙾𝙾𝙽 🌅`;
} else if (realTime < "18:00:00") {
  pushwish = `𝙶𝙾𝙾𝙳 𝙴𝚅𝙴𝙽𝙸𝙽𝙶 🌃`;
} else if (realTime < "19:00:00") {
  pushwish = `𝙶𝙾𝙾𝙳 𝙴𝚅𝙴𝙽𝙸𝙽𝙶 🌃`;
} else {
  pushwish = `𝙶𝙾𝙾𝙳 𝙽𝙸𝙶𝙷𝚃 🌌`;
}

  const sendCommandMessage = async (messageContent) => {
    await sock.sendMessage(
      m.from,
      {
        text: messageContent,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '', // Preserved newsletter JID
            newsletterName: "",
            serverMessageId: -1,
          },
          externalAdReply: {
            title: "",
            body: pushName,
            thumbnailUrl: '', // Thumbnail URL
            sourceUrl: '', // Source URL
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
  };

  // Command: allmenu
  if (cmd === "menu2") {
    await m.React('⏳'); // React with a loading icon
    const aliveMessage = `
 
╭───❍「 *TREX MD* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 🚀 *𝚄𝚙𝚃𝚒𝚖𝚎:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 * TREX MD MENU LIST* 」
*│* 💙 *${prefix}Islamicmenu*
*│* 📥 *${prefix}downloadmenu*
*│* 🤖 *${prefix}Aimenmenu*
*│* 💭 *${prefix}Searchmenu*
*│* ⚙️ *${prefix}Toolsmenu*
*│* ©️ *${prefix}Logomenu*
*│* 🫂 *${prefix}Groupmenu*
╰───────────❍ 
╭───────────❍
│Powered By Bera tech
╰───────────❍
`;

    await m.React('✅'); // React with success icon
    await sendCommandMessage(aliveMessage);
  }
// islamic menu 
  if (cmd === "islamicmenu") {
    await m.React('⏳'); // React with a loading icon

    const islamicmenuMessage = `
 
╭───❍「 *TREX MD* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 🚀 *𝚄𝚙𝚃𝚒𝚖𝚎:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *ISLAMIC MENU* 」
*│* 💙 *${prefix}Surahaudio*
*│* 💙 *${prefix}Surahurdu*
*│* 💙 *${prefix}Asmaulhusna*
*│* 💙 *${prefix}Prophetname*
╰───────────❍  
╭───────────❍
│TREX MD
╰───────────❍
`;
await m.React('✅'); // React with success icon
    await sendCommandMessage(islamicmenuMessage);
  }
  // Command: downloadmenu
  if (cmd === "downloadmenu") {
    await m.React('⏳'); // React with a loading icon

    const downloadmenuMessage = `

   
╭───❍「 *TREX MD* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 🚀 *𝚄𝚙𝚃𝚒𝚖𝚎:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
 ╭───❍「 *DOWNLOAD MENU * 」
*┋*⏬️ *${prefix}Fb*
*┋*⏬️ *{prefix}Insta*
*┋*⏬️ *${prefix}Insta2*
*┋*⏬️ *{prefix}Play*
*┋*⏬️ *${prefix}Song*
*┋*⏬️ *{prefix}Video*
*┋*⏬️ *${prefix}TwitAudio*
*┋*⏬️ *${prefix}Tiktok*
*┋*⏬️ *${prefix}Tiktok2*
*┋*⏬️ *${prefix}MediaFire2*
*┋*⏬️ *${prefix}Apk*
 ╰───────────❍   
╭───────────❍
│TREX MD
╰──────────
`;
await m.React('✅'); // React with success icon
    await sendCommandMessage(downloadmenuMessage);
  }
  // Command: aimenu
  if (cmd === "aimenu") {
    await m.React('⏳'); // React with a loading icon

    const aimenuMessage = `
╭───❍「 *TREX MD* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 🚀 *𝚄𝚙𝚃𝚒𝚖𝚎:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *TREX MD* 」
*┋*🧠 *${prefix}𝙶𝚙𝚝*
*┋*🧠 *${prefix}𝙼𝚎𝚝𝚊*
*┋*🧠 *${prefix}𝙱𝚕𝚊𝚌𝚔𝙱𝚘𝚡*
*┋*🧠 *${prefix}𝙻𝚕𝚊𝚖𝚊*
*┋*🧠 *${prefix}𝙲𝚕𝚊𝚞𝚍𝚎*
*┋*🧠 *${prefix}𝙼𝚒𝚡𝚝𝚛𝚊𝚕*
╰───────────❍
╭───────────❍
│TREX MD BOT
╰───────────❍
`;
await m.React('✅'); // React with success icon
    await sendCommandMessage(aimenuMessage);
  }
  // Command: groupmenu
  if (cmd === "logomenu") {
    await m.React('⏳'); // React with a loading icon

    const logomenuMessage = `
╭───❍「 *TREX MD* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 🚀 *𝚄𝚙𝚃𝚒𝚖𝚎:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *joel md* 
*┋* © *${prefix}𝙻𝚘𝙶𝚘*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘1*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘2*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘3*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘4*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘5*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘6*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘6*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘7*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘8*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘9*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘10*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘11*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘12*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘13*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘14*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘15*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘16*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘17*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘18*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘19*
╭───────────❍
│joel tech 
╰───────────❍
`;

await m.React('✅'); // React with success icon
    await sendCommandMessage(logomenuMessage);
  }
  // Command: joel
  if (cmd === "groupmenu") {
    await m.React('⏳'); // React with a loading icon

    const stalkerMessage = `
╭───❍「 *TREX MD* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 🚀 *𝚄𝚙𝚃𝚒𝚖𝚎:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *TREX MD* 
*┋* 🫂 *${prefix}𝙾𝚙𝚎𝚗*
*┋* 🫂 *${prefix}𝙲𝚕𝚘𝚜𝚎*
*┋* 🫂 *${prefix}𝚃𝚊𝚐𝚊𝚕𝚕*
*┋* 🫂 *${prefix}𝙺𝚒𝚌𝚔*
*┋* 🫂 *${prefix}𝙰𝚍𝚍*
*┋* 🫂 *${prefix}𝙳𝚒𝚜 24𝚑*
*┋* 🫂 *${prefix}𝙸𝚗𝚟𝚒𝚝𝚎*
╭───────────❍
│TREX MD 
╰───────────❍
`;
await m.React('✅'); // React with success icon
    await sendCommandMessage(stalkerMessage);
  }
 
  // Command: allmenu
  if (cmd === "searchmenu") {
    await m.React('⏳'); // React with a loading icon

    const stickerMessage = `
╭───❍「 *TREX MD* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 🚀 *𝚄𝚙𝚃𝚒𝚖𝚎:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
 ╭───❍「 *TREX MD* 」
*┋*📡 *${prefix}𝚈𝚝𝚜*
*┋*📡 *${prefix}𝙶𝚒𝚝𝚜*
*┋*📡 *${prefix}𝚃𝚒𝚔𝚜*
*┋*📡 *${prefix}𝚆𝚊𝚕𝚕𝚙𝚊𝚙𝚎𝚛*
*┋*📡 *${prefix}𝚂𝚙𝚘𝚝𝚒𝚏𝚢*
╰───────────❍
╭───────────❍
│TREX MD
╰───────────❍
`;
await m.React('✅'); // React with success icon
    await sendCommandMessage(stickerMessage);
  }
  // Command: ownermenu
  if (cmd === "ownermenu") {
    await m.React('⏳'); // React with a loading icon

    const ownerMessage = `
    ╭───❍「 *TREX MD* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 🚀 *𝚄𝚙𝚃𝚒𝚖𝚎:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
 ╭───❍「 *TREX MD* 」
*┋*💫 *${prefix}𝚁𝚎𝚜𝚝𝚊𝚛𝚝*
*┋*💫 *${prefix}𝙾𝚠𝚗𝚎𝚛𝚁𝚎𝚊𝚌𝚝*
*┋*💫 *${prefix}𝙷𝚎𝚊𝚛𝚝𝚁𝚎𝚊𝚌𝚝*
*┋*💫 *${prefix}𝙹𝚘𝚒𝚗*
*┋*💫 *${prefix}𝙻𝚎𝚏𝚝*
*┋*💫 *${prefix}𝙱𝚛𝚘𝚊𝚍𝚌𝚊𝚜𝚝*
*┋*💫 *${prefix}𝚅𝚟*
*┋*💫 *${prefix}𝚅𝚟2*
*┋*💫 *${prefix}𝙳𝚎𝚕𝚎𝚝𝚎*
*┋*💫 *${prefix}𝚂𝚊𝚟𝚎*
╭───────────❍
│HELLO ${pushName} ${pushwish}
╰───────────❍
`;

    await m.React('✅'); // React with success icon
    await sendCommandMessage(ownerMessage);
  }
  //Command: othermenu
  if (cmd === "othermenu") {
    await m.React('⏳'); // React with a loading icon

    const otherMessage = `
╭───❍「 *TREX MD* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 🚀 *𝚄𝚙𝚃𝚒𝚖𝚎:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *TREX MD* 」
*│ *🗿 *${prefix}𝙿𝚒𝚗𝚐*
*│ *🗿 *${prefix}𝙰𝚋𝚘𝚞𝚝*
*│ *🗿 *${prefix}𝚛𝚎𝚙𝚘*
*│ *🗿 *${prefix}𝙰𝚕𝚒𝚟𝚎*
*│ *🗿 *${prefix}𝚄𝚛𝚕*
*│ *🗿 *${prefix}𝚂𝚎𝚗𝚍𝚖𝚎*
╰───────────❍   
╭───────────❍
│joel tech
╰───────────❍
`;
await m.React('✅'); // React with success icon
    await sendCommandMessage(otherMessage);
  }
    if (cmd === "toolsmenu") {
    await m.React('⏳'); // React with a loading icon
    const toolsMessage = `
╭───❍「 *joel md* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 🚀 *𝚄𝚙𝚃𝚒𝚖𝚎:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *TREX MD* 」
*┋*🛡  *${prefix}𝚂𝚜*
*┋*🛡  *${prefix}𝚆𝚎𝚋𝚜𝚜*
*┋*🛡  *${prefix}𝙵𝚞𝚕𝚕𝚜𝚜*
*┋*🛡  *${prefix}𝚃𝚛𝚝*
*┋*🛡  *${prefix}𝙵𝚎𝚝𝚌𝚑*
*┋*🛡  *${prefix}𝚃𝚎𝚡𝚝2𝚒𝚖𝚐*
╰───────────❍  
╭───────────❍
│THANKS ${pushName} ${pushwish}
╰───────────❍
`;
await m.React('✅'); // React with success icon
    await sendCommandMessage(toolsMessage);
  }
};
// coded by lord joel

export default allMenu;
