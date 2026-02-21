import { PREFIX, OWNER_LID } from "../../config.js";
import { WarningError } from "../../errors/index.js";
import { activateGroup } from "../../utils/database.js";

export default {
  name: "on",
  description: "Ativa o bot no grupo (Apenas Dono)",
  commands: ["on"],
  usage: `${PREFIX}on`,

  handle: async ({ socket, remoteJid, isGroup, userLid }) => {
    if (!isGroup) throw new WarningError("Use este comando em um grupo.");

    // --- TRAVA EXCLUSIVA PARA O DONO ---
    if (userLid !== OWNER_LID) {
      return socket.sendMessage(remoteJid, { 
        text: "⚠️ *ACESSO RESTRITO*\n\nApenas o meu criador (Dono) pode executar este comando." 
      });
    }

    activateGroup(remoteJid);

    const onText = `
╭━━━━━━━━━━━━━━━╮
    ⚡  𝐒𝐘𝐒𝐓𝐄𝐌 𝐎𝐍𝐋𝐈𝐍𝐄
╰━━━━━━━━━━━━━━━╯
◈ 𝚂𝚝𝚊𝚝𝚞𝚜: Ativado ✅

『 ⚡ 𝐌𝟕𝐳𝐢𝐧𝐗𝐱 𝐒𝐲𝐬𝐭𝐞𝐦 』`.trim();

    await socket.sendMessage(remoteJid, {
      text: onText,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 999,
        showAdAttribution: true,
        externalAdReply: {
          title: "🌑 𝐦𝟕𝐳𝐢𝐧𝐗𝐱 - 𝐎𝐍𝐋𝐈𝐍𝐄 ✅",
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
  },
};
