import fs from "node:fs";
import path from "node:path";
import { ASSETS_DIR, PREFIX, OWNER_LID } from "../../config.js";
import { InvalidParameterError, DangerError } from "../../errors/index.js";
import { errorLog } from "../../utils/logger.js";

export default {
  name: "set-menu-image",
  description: "Altera a imagem principal do menu do bot.",
  commands: ["setimg", "setmenuimg", "setimage"],
  usage: `${PREFIX}setimg (responda a uma imagem)`,

  handle: async ({
    socket,
    remoteJid,
    userLid,
    isImage,
    isReply,
    downloadImage,
    webMessage,
  }) => {
    // --- TRAVA EXCLUSIVA PARA O DONO ---
    if (userLid !== OWNER_LID) {
      return socket.sendMessage(remoteJid, { 
        text: "❌ *ACESSO NEGADO*\n\nApenas o meu Dono pode alterar minha identidade visual." 
      });
    }

    if (!isReply || !isImage) {
      throw new InvalidParameterError(
        "Você precisa responder a uma imagem para aplicar no menu!"
      );
    }

    try {
      // Definindo o caminho para a imagem do M7ZINXX
      const imageDir = path.join(ASSETS_DIR, "images");
      const menuImagePath = path.join(imageDir, "m7zinxx-bot.png"); // Nome atualizado
      const backupPath = path.join(imageDir, "m7-backup.png");

      // Criar diretório se não existir
      if (!fs.existsSync(imageDir)) {
        fs.mkdirSync(imageDir, { recursive: true });
      }

      // Backup da imagem atual se ela existir
      if (fs.existsSync(menuImagePath)) {
        fs.copyFileSync(menuImagePath, backupPath);
      }

      // Baixa a nova imagem
      const tempPath = await downloadImage(webMessage, "new-m7-menu");

      // Substitui a imagem antiga pela nova
      if (fs.existsSync(menuImagePath)) {
        fs.unlinkSync(menuImagePath);
      }
      fs.renameSync(tempPath, menuImagePath);

      const successText = `
╭━━━━━━━━━━━━━━━━╮
  🖼️  𝐌𝐄𝐍𝐔 𝐔𝐏𝐃𝐀𝐓𝐄
╰━━━━━━━━━━━━━━━━╯

◈ 𝚂𝚝𝚊𝚝𝚞𝚜: Imagem Atualizada ✅
◈ 𝙰𝚞𝚝𝚘𝚛: Dono (m7zinXx)

_A nova imagem será exibida na próxima vez que o menu for solicitado._

`.trim();

      await socket.sendMessage(remoteJid, {
        text: successText,
        contextInfo: {
          externalAdReply: {
            title: "🌑 𝐦𝟕𝐳𝐢𝐧𝐗𝐱 - 𝐆𝐑𝐀𝐏𝐇𝐈𝐂𝐒 ✅",
            body: `𝙄𝙙𝙚𝙣𝙩𝙞𝙙𝙖𝙙𝙚 𝙫𝙞𝙨𝙪𝙖𝙡 𝙖𝙩𝙪𝙖𝙡𝙞𝙯𝙖𝙙𝙖 𝙘𝙤𝙢 𝙨𝙪𝙘𝙚𝙨𝙨𝙤!`,
            mediaType: 1,
            thumbnail: fs.readFileSync(menuImagePath), // Mostra a nova imagem já no log
            sourceUrl: "https://instagram.com/miglz77x"
          }
        }
      });

    } catch (error) {
      errorLog(`Erro ao alterar imagem do menu: ${error}`);
      return socket.sendMessage(remoteJid, { text: "❌ Erro interno ao salvar a imagem." });
    }
  },
};
