import { PREFIX } from "../../config.js";

export default {
  name: "hide-tag",
  description: "Marca todos com selo de verificado Business e Ad Attribution.",
  commands: ["hide-tag", "hidetag", "marcar", "marca", "tagall", "todos"],
  usage: `${PREFIX}hidetag [motivo]`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ fullArgs, socket, remoteJid, sendReact, isGroup, isAdmin }) => {
    if (!isGroup) return; // Silencioso se não for grupo
    if (!isAdmin) return; // Só ADM usa

    try {
      const { participants } = await socket.groupMetadata(remoteJid);
      const mentions = participants.map(({ id }) => id);
      const text = fullArgs || "📢 Atenção todos os membros!";

      await sendReact("✅");

      // O segredo do selo de verificado está aqui no contextInfo
      await socket.sendMessage(remoteJid, {
        text: text,
        mentions: mentions, // Importante para marcar todos de verdade
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          showAdAttribution: true, // Aqui gera o selo "Anúncio/Verificado"
          externalAdReply: {
            title: "🌑 𝐦𝟕𝐳𝐢𝐧𝐗𝐱 - 𝐀𝐃𝐌𝐈𝐍 ✅",
            body: `𝙨𝙚 𝘿𝙚𝙪𝙨 𝙚́ 𝙥𝙤𝙧 𝙣𝙤𝙞𝙨, 𝙦𝙪𝙚𝙢 𝙨𝙚𝙧𝙖́ 𝙘𝙤𝙣𝙩𝙧𝙖 𝙣𝙤́𝙨?`,
            mediaType: 1,
            thumbnailUrl: "https://i.imgur.com/uRovvWp.png", 
            sourceUrl: "https://instagram.com/miglz77x",
            renderLargerThumbnail: true // Deixa a imagem maior e mais bonita
          }
        }
      }, { 
        quoted: { 
          key: { participant: "0@s.whatsapp.net", remoteJid: "status@broadcast" }, 
          message: { conversation: "𝙢𝙚 𝙨𝙞𝙜𝙖𝙢 𝙣𝙤 𝙄𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢 : 𝙢𝙞𝙜𝙡𝙯77𝙭" } 
        } 
      });
    } catch (e) {
      console.log("Erro no hide-tag:", e);
    }
  },
};
