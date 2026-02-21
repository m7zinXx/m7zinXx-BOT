import { OWNER_LID } from "../../config.js";

export default {
  name: "limparadm",
  description: "Remove o ADM de todos, exceto do Dono do Bot, do Bot e do Criador do Grupo.",
  commands: ["limparadm", "faxina"],
  usage: "!limparadm",

  handle: async ({ socket, remoteJid, userLid, isGroup }) => {
    if (userLid !== OWNER_LID) return;
    if (!isGroup) return;

    try {
      const groupMetadata = await socket.groupMetadata(remoteJid);
      const participants = groupMetadata.participants;
      const botNumber = socket.user.id.split(':')[0] + '@s.whatsapp.net';
      
      const groupCreator = groupMetadata.owner;

      const admsToDemote = participants
        .filter(p => 
          p.admin !== null && 
          p.id !== OWNER_LID && 
          p.id !== botNumber && 
          p.id !== groupCreator
        )
        .map(p => p.id);

      if (admsToDemote.length === 0) {
        return await socket.sendMessage(remoteJid, { 
          text: "✅ *m7zinXx a lista já está limpa (só restaram os intocáveis).* " 
        });
      }

      await socket.groupParticipantsUpdate(remoteJid, admsToDemote, "demote");

      await socket.sendMessage(remoteJid, {
        text: `🧹 *\n\nRemovi o cargo de ${admsToDemote.length} administradores.\n\n🛡️ *Poupados:* Você, o Bot e o Criador do Grupo.`,
        contextInfo: {
          hasVerificatedBadge: true,
          isForwarded: true,
          forwardingScore: 999,
          showAdAttribution: true,
          externalAdReply: {
            title: "🌑 𝐦𝟕𝐳𝐢𝐧𝐗𝐱 𝐁𝐎𝐓 - 𝐒𝐀𝐅𝐄 𝐂𝐋𝐄𝐀𝐍 ✅",
            body: `𝙁𝙖𝙭𝙞𝙣𝙖.`,
            mediaType: 1,
            thumbnailUrl: "https://i.imgur.com/uRovvWp.png",
            sourceUrl: "https://instagram.com/miglz77x"
          }
        }
      });
    } catch (e) {
      console.log(e);
      await socket.sendMessage(remoteJid, { text: "❌ *ERRO*: Falha ao processar a faxina." });
    }
  },
};
