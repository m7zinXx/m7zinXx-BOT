import { PREFIX } from "../../config.js";
import { isGroup } from "../../utils/index.js";

export default {
  name: "perfil",
  description: "Dossiê de usuário simplificado",
  commands: ["perfil", "profile"],
  usage: `${PREFIX}perfil`,

  handle: async ({ args, socket, remoteJid, userLid, webMessage }) => {
    // 🛡️ TRAVA ANTI-LOOP: Ignora se for o próprio bot
    if (webMessage.key.fromMe) return;

    if (!isGroup(remoteJid)) return;

    // Pega o alvo sem precisar de funções extras que dão rate-limit
    const target = webMessage.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || 
                   webMessage.key.participant || 
                   userLid;

    try {
      // 🚀 ECONOMIA DE ENERGIA: Em vez de buscar a foto (que dá erro de limite), 
      // vamos usar uma imagem fixa ou tentar a foto apenas UMA vez sem forçar.
      let profilePic = "https://i.imgur.com/uRovvWp.png"; 

      // Status Randômicos (Sem precisar consultar o servidor do zap toda hora)
      const gado = Math.floor(Math.random() * 100);
      const passiva = Math.floor(Math.random() * 100);
      const beleza = Math.floor(Math.random() * 100);
      const preco = (Math.random() * 5000 + 1000).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

      const perfilText = `
  ╭━━━━━━━━━━━━━━━━━━━━╮
     👤  𝐔𝐒𝐄𝐑  𝐃𝐎𝐒𝐒𝐈𝐄̂
  ╰━━━━━━━━━━━━━━━━━━━━╯

  ◈ 𝚄𝚜𝚎𝚛: @${target.split("@")[0]}
  ◈ 𝚂𝚝𝚊𝚝𝚞𝚜: Monitorado 🔒

  ┌─〔 📊  𝐒𝐓𝐀𝐓𝐒  〕─┐
  ┆ 
  ┆ 🌑 𝙿𝚛𝚘𝚐𝚛𝚊𝚖𝚊: ${preco}
  ┆ 🐮 𝙶𝚊𝚍𝚘: ${gado}%
  ┆ 🎱 𝙿𝚊𝚜𝚜𝚒𝚟𝚊: ${passiva}%
  ┆ ✨ 𝙱𝚎𝚕𝚎𝚣𝚊: ${beleza}%
  ┆
  └──────────────╼ 🌑`.trim();

      await socket.sendMessage(remoteJid, {
        image: { url: profilePic },
        caption: perfilText,
        mentions: [target],
        contextInfo: {
          externalAdReply: {
            title: "🌑 𝐦𝟕𝐳𝐢𝐧𝐗𝐱 𝐛𝐨𝐭 - 𝐏𝐄𝐑𝐅𝐈𝐋 ✅",
            body: `𝙙𝙞𝙖𝙜𝙣𝙤́𝙨𝙩𝙞𝙘𝙤 𝙤𝙥𝙩𝙞𝙢𝙞𝙯𝙖𝙙𝙤`,
            mediaType: 1,
            showAdAttribution: true,
            thumbnailUrl: "https://i.imgur.com/uRovvWp.png", 
            sourceUrl: "https://wa.me/558394190215"
          }
        }
      }, { 
        quoted: { 
          key: { participant: "0@s.whatsapp.net", remoteJid: "status@broadcast" }, 
          message: { conversation: "𝙢𝙚 𝙨𝙞𝙜𝙖𝙢 𝙣𝙤 𝙄𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢 : 𝙢𝙞𝙜𝙡𝙯77𝙭" } 
        } 
      });

    } catch (error) {
      // Se der erro de limite, ele apenas avisa no console sem travar o bot
      console.log("Aguardando cooldown do WhatsApp...");
    }
  },
};
