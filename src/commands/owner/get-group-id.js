import { PREFIX } from "../../config.js";
import { WarningError } from "../../errors/index.js";

export default {
  name: "get-group-id",
  description: "Retorna o ID completo do grupo (JID).",
  commands: ["get-group-id", "id-gp", "id"],
  usage: `${PREFIX}id`,

  handle: async ({ socket, remoteJid, isGroup }) => {
    if (!isGroup) {
      throw new WarningError("Este comando deve ser usado dentro de um grupo.");
    }

    const idText = `
╭━━━━━━━━━━━━━━━╮
🆔  𝐆𝐑𝐎𝐔𝐏 𝐈𝐃
╰━━━━━━━━━━━━━━━╯

◈ 𝙹𝙸𝙳: \`${remoteJid}\`

_Use este ID para configurações internas ou travas de grupo no banco de dados._

`.trim();

    // Resposta Premium com Selo de Verificado
    await socket.sendMessage(remoteJid, {
      text: idText,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 999,
        showAdAttribution: true,
        externalAdReply: {
          title: "🌑 𝐦𝟕𝐳𝐢𝐧𝐗𝐱 - 𝐈𝐍𝐅𝐎 ✅",
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
