import { OWNER_LID } from "../../config.js";

export default {
  name: "broadcast",
  description: "Envia um comunicado oficial para todos os grupos com selo de verificado.",
  commands: ["bc", "aviso", "transmitir"],
  usage: "!bc [texto]",

  handle: async ({ socket, remoteJid, fullArgs, userLid }) => {
    // Acesso exclusivo para o Miguel (Noah)
    if (userLid !== OWNER_LID) return;
    
    if (!fullArgs) return socket.sendMessage(remoteJid, { 
      text: "⚠️ Miguel, digite o conteúdo do aviso!",
      contextInfo: { hasVerificatedBadge: true } 
    });

    const groups = Object.keys(await socket.groupFetchAllParticipating());
    await socket.sendMessage(remoteJid, { 
      text: `🚀 *M7ZINXX SYSTEM*\n\nTransmitindo para ${groups.length} grupos...`,
      contextInfo: { hasVerificatedBadge: true }
    });

    for (const groupId of groups) {
      await socket.sendMessage(groupId, {
        text: `╭━━━━━━━━━━━━━━━━╮\n    📢  𝐀𝐕𝐈𝐒𝐎 𝐎𝐅𝐈𝐂𝐈𝐀𝐋\n╰━━━━━━━━━━━━━━━━╯\n\n${fullArgs}\n\n`,
        contextInfo: {
          hasVerificatedBadge: true, // ✅ Selo Business
          isForwarded: true,
          forwardingScore: 999,
          showAdAttribution: true,
          externalAdReply: {
            title: "🌑 𝐦𝟕𝐳𝐢𝐧𝐗𝐱 𝐁𝐎𝐓 - 𝐁𝐑𝐎𝐀𝐃𝐂𝐀𝐒𝐓 ✅",
            body: `𝙈𝙚𝙣𝙨𝙖𝙜𝙚𝙢 𝙫𝙞𝙣𝙙𝙖 𝙙𝙤 𝘿𝙤𝙣𝙤.`,
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
    }

    await socket.sendMessage(remoteJid, { 
      text: "✅ *SUCESSO*\n\nTransmissão enviada com SUCESSO",
      contextInfo: { hasVerificatedBadge: true }
    });
  },
};
