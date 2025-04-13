/*
import axios from "axios";
import { createRequire } from "module";

// Import config.cjs using createRequire
const require = createRequire(import.meta.url);
const config = require("../../config.cjs");

const ytsCommand = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";
  const validCommands = ["yts", "ytsearch"];

  if (validCommands.includes(cmd)) {
    // Extract the search query from the command (e.g., "!yts <search_query>")
    const searchQuery = m.body.split(" ").slice(1).join(" ");

    if (!searchQuery) {
      await gss.sendMessage(
        m.from,
        { text: "❌ Please provide a valid search query after the command." },
        { quoted: m }
      );
      return;
    }

    const apiUrl = `https://www.dark-yasiya-api.site/search/yt?text=${encodeURIComponent(searchQuery)}`;

    try {
      // Fetch data from API
      const response = await axios.get(apiUrl);
      const apiData = response.data;

      if (apiData.status && apiData.result) {
        const videos = apiData.result.data;

        if (videos.length === 0) {
          await gss.sendMessage(
            m.from,
            { text: "❌ No results found for your search." },
            { quoted: m }
          );
          return;
        }

        let message = `*Top results for "${searchQuery}":*\n\n`;

        videos.slice(0, 5).forEach((video, index) => {
          message += `*${index + 1}. ${video.title}*\n`;
          message += `⏳ Duration: ${video.duration.timestamp}\n`;
          message += `👁 Views: ${video.views}\n`;
          message += `📝 Author: ${video.author.name}\n`;
          message += `🔗 [Watch here](https://youtube.com/watch?v=${video.videoId})\n\n`;
        });

        await gss.sendMessage(m.from, { text: message }, { quoted: m });
      } else {
        await gss.sendMessage(
          m.from,
          { text: "❌ Failed to fetch YouTube results. Please try again later." },
          { quoted: m }
        );
      }
    } catch (error) {
      console.error("Error in YTS Command:", error);
      await gss.sendMessage(
        m.from,
        { text: "❌ An error occurred while processing the search. Please try again later." },
        { quoted: m }
      );
    }
  }
};

export default ytsCommand;

// Sarkar-MD POWERED BY BANDAHEALI
*/


import axios from "axios";
import { createRequire } from "module";

// Import config.cjs using createRequire
const require = createRequire(import.meta.url);
const config = require("../../config.cjs");

const ytsCommand = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(" ")[0].toLowerCase()
    : "";
  const validCommands = ["yts", "ytsearch"];

  if (validCommands.includes(cmd)) {
    const searchQuery = m.body.split(" ").slice(1).join(" ");

    if (!searchQuery) {
      await gss.sendMessage(
        m.from,
        { text: "Oopsie! ❌ You forgot to tell me what to search for~ Please add a query after the command, cutie!" },
        { quoted: m }
      );
      return;
    }

    const apiUrl = `https://www.dark-yasiya-api.site/search/yt?text=${encodeURIComponent(searchQuery)}`;

    try {
      const response = await axios.get(apiUrl);
      const apiData = response.data;

      if (apiData.status && apiData.result) {
        const videos = apiData.result.data;

        if (!videos || videos.length === 0) {
          await gss.sendMessage(
            m.from,
            { text: "Aww~ ❌ I couldn’t find anything for that search... Wanna try something else?" },
            { quoted: m }
          );
          return;
        }

        let message = `*Hehe~ here are the cutest YouTube results I found for:* \n*“${searchQuery}”*\n\n`;
        message += `┌───────────────┐\n`;
        message += `│  ✨ Top 5 Results ✨  │\n`;
        message += `└───────────────┘\n\n`;

        videos.slice(0, 5).forEach((video, index) => {
          message += `*${index + 1}. ${video.title}*\n`;
          message += `⏳ *Duration:* ${video.duration?.timestamp || "N/A"}\n`;
          message += `👀 *Views:* ${video.views || "Nyaa~"}\n`;
          message += `👤 *Author:* ${video.author?.name || "Unknown"}\n`;
          message += `🔗 *[Watch here](https://youtube.com/watch?v=${video.videoId})*\n`;
          message += `──────────────────────\n`;
        });

        const messagePayload = {
          text: message,
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

        await gss.sendMessage(m.from, messagePayload, { quoted: m });
      } else {
        await gss.sendMessage(
          m.from,
          { text: "Eek! ❌ Something went wrong while fetching the videos... Please try again later, okay?" },
          { quoted: m }
        );
      }
    } catch (error) {
      console.error("Error in YTS Command:", error);
      await gss.sendMessage(
        m.from,
        { text: "Waaah~ ❌ I ran into an error while searching... Can you try again in a bit?" },
        { quoted: m }
      );
    }
  }
};

export default ytsCommand;
