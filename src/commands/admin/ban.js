import { BOT_LID, OWNER_LID, PREFIX } from "../../config.js";
import { DangerError, InvalidParameterError } from "../../errors/index.js";
import { onlyNumbers } from "../../utils/index.js";
import { errorLog } from "../../utils/logger.js";

export default {
  name: "ban",
  description: "Remove um membro do grupo com estilo.",
  commands: ["ban", "kick","vasco"],
  usage: `${PREFIX}ban @membro`,

  handle: async ({
    args,
    isReply,
    socket,
    remoteJid,
    replyLid,
    userLid,
    webMessage
  }) => {
    try {
      if (!args.length && !isReply) {
        throw new InvalidParameterError("Mencione alguém ou responda uma mensagem!");
      }

      const userId = args[0] ? `${onlyNumbers(args[0])}@lid` : null;
      const memberToRemoveLid = isReply ? replyLid : userId;

      if (!memberToRemoveLid) {
        throw new InvalidParameterError("Membro inválido!");
      }

      // Travas de Segurança
      if (memberToRemoveLid === userLid) throw new DangerError("Você não pode se auto-banir! 😂");
      if (memberToRemoveLid === OWNER_LID) throw new DangerError("Tá louco? Não posso banir meu mestre! 👑");
      if (memberToRemoveLid === BOT_LID) throw new DangerError("Tentar me banir? Que audácia! 🦾");

      // Executa a remoção
      await socket.groupParticipantsUpdate(remoteJid, [memberToRemoveLid], "remove");

      const banText = `
╭━━━━━━━━━━━━━━━╮
🚫  𝐌𝐄𝐌𝐁𝐄𝐑 𝐁𝐀𝐍𝐍𝐄𝐃
╰━━━━━━━━━━━━━━━╯

◈ 𝚄𝚜𝚎𝚛: @${memberToRemoveLid.split('@')[0]}
◈ 𝚂𝚝𝚊𝚝𝚞𝚜: Removido com Sucesso ✅
◈ 𝙼𝚘𝚝𝚒vo: Descumprimento das Regras

_O martelo da justiça foi batido!_

`.trim();

      // Resposta com Selo de Verificado e Quoted Fake
      await socket.sendMessage(remoteJid, {
        text: banText,
        mentions: [memberToRemoveLid],
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          showAdAttribution: true,
          externalAdReply: {
            title: "🌑 𝐦𝟕𝐳𝐢𝐧𝐗𝐱 - 𝐉𝐔𝐒𝐓𝐈𝐂𝐄 ✅",
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

    } catch (error) {
      errorLog(error);
      await socket.sendMessage(remoteJid, { 
        text: `❌ *ERRO:* ${error.message}` 
      });
    }
  },
};
