import { OWNER_LID } from "../../config.js";

export default {
  name: "leave",
  description: "Retira o bot do grupo com selo de verificado.",
  commands: ["leave", "vaza", "sair"],
  usage: "!leave",

  handle: async ({ socket, remoteJid, userLid, isGroup }) => {
    // Validação de segurança para o Miguel (Noah)
    if (userLid !== OWNER_LID) return;
    if (!isGroup) return;

    await socket.sendMessage(remoteJid, {
      text: "👋 *𝐌𝟕𝐳𝐢𝐧𝐗𝐱 𝐁𝐎𝐓 𝐒𝐀𝐈𝐍𝐃𝐎...*\n\nMeu tempo aqui acabou. Ordens do meu dono m7zinXx.",
      contextInfo: {
        hasVerificatedBadge: true, // ✅ Selo de Verificado oficial
        isForwarded: true,
        forwardingScore: 999,
        showAdAttribution: true,
        externalAdReply: {
          title: "🌑 𝐦𝟕𝐳𝐢𝐧𝐗𝐱 𝐁𝐎𝐓 - 𝐄𝐗𝐈𝐓 ✅",
          body: `𝙊 𝙗𝙤𝙩 𝙚𝙨𝙩𝙖́ 𝙙𝙚𝙞𝙭𝙖𝙣𝙙𝙤 𝙤 𝙜𝙧𝙪𝙥𝙤.`,
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


    setTimeout(async () => {
      await socket.groupLeave(remoteJid);
    }, 1500);
  },
};
