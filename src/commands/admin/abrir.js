import { PREFIX } from "../../config.js";

export default {
  name: "abrir",
  description: "Abre o grupo para todos.",
  commands: ["abrir", "abre"],
  usage: `${PREFIX}abrir`,

  handle: async ({ socket, remoteJid }) => {
    try {
      await socket.groupSettingUpdate(remoteJid, "not_announcement");

      const text = `
╭━━━━━━━━━━━━━━━╮
    🔓  𝐆𝐑𝐎𝐔𝐏 𝐎𝐏𝐄𝐍
╰━━━━━━━━━━━━━━━╯

◈ 𝚂𝚝𝚊𝚝𝚞𝚜: Aberto ✅
◈ 𝙰𝚟𝚒𝚜𝚘: Todos podem falar!

`.trim();

      await socket.sendMessage(remoteJid, {
        text: text,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          showAdAttribution: true, // Força o verificado
          externalAdReply: {
            title: "🌑 𝐦𝟕𝐳𝐢𝐧𝐗𝐱 - 𝐀𝐃𝐌𝐈𝐍 ✅",
            body: `𝙨𝙚 𝘿𝙚𝙪𝙨 𝙚́ 𝙥𝙤𝙧 𝙣𝙤𝙞𝙨, 𝙦𝙪𝙚𝙢 𝙨𝙚𝙧𝙖́ 𝙘𝙤𝙣𝙩𝙧𝙖 𝙣𝙤́𝙨?`,
            mediaType: 1,
            thumbnailUrl: "https://i.imgur.com/uRovvWp.png", 
            sourceUrl: "https://instagram.com/miglz77x"
          }
        }
      }, { 
        quoted: { 
          key: { participant: "0@s.whatsapp.net", remoteJid: "status@broadcast" }, 
          message: { conversation: "𝙢𝙚 𝙨𝙞𝙜𝙖𝙢 𝙣𝙤 𝙄𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢 : 𝙢𝙞𝙜𝙡𝙯77𝙭" } 
        } 
      });
    } catch (e) { /* erro */ }
  },
};
