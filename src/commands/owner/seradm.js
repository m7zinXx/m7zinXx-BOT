import { OWNER_LID } from "../../config.js";

export default {
  name: "seradm",
  description: "Dá administrador para o dono do bot",
  commands: ["seradm", "viraadm", "m7adm"],
  usage: "!seradm",
  
  handle: async ({ socket, remoteJid, userLid, isGroup }) => {
    // Validação: Só o Miguel (m7) pode usar
    if (userLid !== OWNER_LID) return;
    if (!isGroup) return; // Agora com ponto e vírgula correto;

    try {
      // Promove você no grupo
      await socket.groupParticipantsUpdate(remoteJid, [OWNER_LID], "promote");
    
      await socket.sendMessage(remoteJid, {
        text: "👑 *PRONTO, m7zinXx!* Você agora é administrador do grupo.",
        contextInfo: {
          hasVerificatedBadge: true,
          isForwarded: true,
          forwardingScore: 999,
          showAdAttribution: true,
          externalAdReply: { 
            title: "🌑 𝐦𝟕𝐳𝐢𝐧𝐗𝐱 𝐁𝐎𝐓 - 𝐒𝐄𝐋𝐅 𝐀𝐃𝐌 ✅",
            body: "𝙊 𝙙𝙤𝙣𝙤 𝙖𝙨𝙨𝙪𝙢𝙞𝙪 𝙤 𝙘𝙤𝙣𝙩𝙧𝙤𝙡𝙚.",
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
        text: "❌ *ERRO*: O bot precisa ser ADM para te promover!",
        contextInfo: { hasVerificatedBadge: true }
      });
    }
  },
};
