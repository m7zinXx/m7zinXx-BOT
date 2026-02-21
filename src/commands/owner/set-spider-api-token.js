import { PREFIX, OWNER_LID } from "../../config.js";
import { InvalidParameterError } from "../../errors/index.js";
import { setSpiderApiToken } from "../../utils/database.js";

export default {
  name: "set-spider-api-token",
  description: "Altera o token da API Spider (Apenas Dono).",
  commands: ["set-token", "spider-token", "set-api"],
  usage: `${PREFIX}set-token [token]`,

  handle: async ({ socket, remoteJid, args, userLid }) => {
    // --- TRAVA EXCLUSIVA PARA O DONO ---
    if (userLid !== OWNER_LID) {
      return socket.sendMessage(remoteJid, { 
        text: "❌ *ACESSO NEGADO*\n\nApenas o meu Dono pode gerenciar chaves de API." 
      });
    }

    if (!args.length) {
      throw new InvalidParameterError("Você deve fornecer o token da API!");
    }

    if (args[0].length < 8 || args[0].length > 25) {
      throw new InvalidParameterError(
        "O token parece inválido! Deve ter entre 8 e 25 caracteres."
      );
    }

    const newToken = args[0];
    setSpiderApiToken(newToken);

    // Mascarar o token para não vazar no print/log do grupo
    const maskedToken = newToken.substring(0, 4) + "********";

    const tokenText = `
╭━━━━━━━━━━━━━━━╮
  🔑  𝐀𝐏𝐈 𝐒𝐄𝐓𝐓𝐈𝐍𝐆𝐒
╰━━━━━━━━━━━━━━━╯

◈ 𝚂𝚝𝚊𝚝𝚞𝚜: Token Atualizado ✅
◈ 𝙰𝙿𝙸: Spider API
◈ 𝙽𝚘𝚟𝚘 𝚃𝚘𝚔𝚎𝚗: \`${maskedToken}\`

_As funções que dependem desta API já estão utilizando a nova chave._

`.trim();

    // Resposta Premium com Selo de Verificado
    await socket.sendMessage(remoteJid, {
      text: tokenText,
      contextInfo: {
        externalAdReply: {
          title: "🌑 𝐦𝟕𝐳𝐢𝐧𝐗𝐱 - 𝐒𝐄𝐂𝐔𝐑𝐈𝐓𝐘 ✅",
          body: `𝙘𝙝𝙖𝙫𝙚𝙨 𝙙𝙚 𝙖𝙘𝙚𝙨𝙨𝙤 𝙖𝙩𝙪𝙖𝙡𝙞𝙯𝙖𝙙𝙖𝙨 𝙘𝙤𝙢 𝙨𝙪𝙘𝙚𝙨𝙨𝙤.`,
          mediaType: 1,
          thumbnailUrl: "https://i.imgur.com/uRovvWp.png", 
          sourceUrl: "https://instagram.com/miglz77x"
        }
      }
    });
  },
};
