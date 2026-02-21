import { PREFIX, OWNER_LID } from "../../config.js";
import { InvalidParameterError } from "../../errors/index.js";
import { setPrefix } from "../../utils/database.js";

export default {
  name: "set-prefix",
  description: "Altera o prefixo dos comandos (Apenas Dono).",
  commands: ["setprefix", "prefixo", "setpref"],
  usage: `${PREFIX}setprefix [caractere]`,

  handle: async ({ socket, remoteJid, args, userLid }) => {
    // --- TRAVA EXCLUSIVA PARA O DONO ---
    if (userLid !== OWNER_LID) {
      return socket.sendMessage(remoteJid, { 
        text: "❌ *ACESSO NEGADO*\n\nApenas o meu Dono pode alterar as configurações do sistema." 
      });
    }

    if (!args.length) {
      throw new InvalidParameterError("Você deve fornecer um prefixo! Ex: !setprefix .");
    }
    
    if (args[0].length !== 1) {
      throw new InvalidParameterError("O prefixo deve ser apenas 1 caractere (ex: !, ., / ou #).");
    }

    const newPrefix = args[0];
    setPrefix(remoteJid, newPrefix);

    const prefixText = `
╭━━━━━━━━━━━━━━━╮
    ⚙️  𝐒𝐘𝐒𝐓𝐄𝐌 𝐂𝐎𝐍𝐅𝐈𝐆
╰━━━━━━━━━━━━━━━╯

◈ 𝚂𝚝𝚊𝚝𝚞𝚜: Prefixo Alterado ✅
◈ 𝙽𝚘𝚟𝚘 𝙿𝚛𝚎𝚏𝚒𝚡𝚘: [ ${newPrefix} ]

_A partir de agora, use o novo caractere para ativar meus comandos neste grupo._

`.trim();

    // Resposta Premium com Selo de Verificado
    await socket.sendMessage(remoteJid, {
      text: prefixText,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 999,
        showAdAttribution: true,
        externalAdReply: {
          title: "🌑 𝐦𝟕𝐳𝐢𝐧𝐗𝐱 - 𝐏𝐑𝐄𝐅𝐈𝐗 ✅",
          body: `𝙘𝙤𝙣𝙛𝙞𝙜𝙪𝙧𝙖𝙘̧𝙤̃𝙚𝙨 𝙙𝙚 𝙨𝙞𝙨𝙩𝙚𝙢𝙖 𝙖𝙩𝙪𝙖𝙡𝙞🇿𝙖𝙙𝙖𝙨.`,
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
