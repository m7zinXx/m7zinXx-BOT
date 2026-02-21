import { OWNER_LID } from "../../config.js";

export default {
  name: "sermembro",
  description: "Remove o administrador do dono do bot",
  commands: ["sermembro", "viramembro", "m7membro"],
  usage: "!sermembro",
  
  handle: async ({ socket, remoteJid, userLid, isGroup }) => {
    if (userLid !== OWNER_LID) return;
    if (!isGroup) return;

    try {
      await socket.groupParticipantsUpdate(remoteJid, [OWNER_LID], "demote");
    
      await socket.sendMessage(remoteJid, {
        text: "Pronto, m7zinXx! Você agora é um membro comum no grupo.",
        contextInfo: {
          hasVerificatedBadge: true,
          isForwarded: true,
          forwardingScore: 999,
          showAdAttribution: true,
          externalAdReply: { 
            title: "🌑 𝐦𝟕𝐳𝐢𝐧𝐗𝐱 𝐁𝐎𝐓 - 𝐃𝐄𝐌𝐎𝐓𝐄 ✅",
            body: "𝙊 𝙙𝙤𝙣𝙤 𝙖𝙗𝙙𝙞𝙘𝙤𝙪 𝙙𝙤 𝙩𝙧𝙤𝙣𝙤.",
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
    } catch (e) {
      await socket.sendMessage(remoteJid, { 
        text: "❌ *ERRO*: Eu preciso ser Administrador para alterar cargos!",
        contextInfo: { hasVerificatedBadge: true }
      });
    }
  },
};
