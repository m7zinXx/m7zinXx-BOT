import { PREFIX } from "../../config.js";

export default {
  name: "link",
  description: "Gera o link de convite do grupo",
  commands: ["link", "linkgp", "convite"],
  usage: `${PREFIX}link`,

  handle: async ({ remoteJid, socket, webMessage, isGroup }) => {
    // 1. Verifica se é grupo
    if (!isGroup) {
      return socket.sendMessage(remoteJid, { text: "❌ Este comando só funciona em grupos!" });
    }

    try {
      // 2. Tenta pegar o código de convite
      const code = await socket.groupInviteCode(remoteJid);
      const link = `https://chat.whatsapp.com/${code}`;

      const linkText = `
  ╭━━━━━━━━━━━━━━━╮
  🔗 GRUPO LINK
  ╰━━━━━━━━━━━━━━━╯
  
  ◈ 𝚄𝚜𝚎𝚛: @${webMessage.key.participant.split('@')[0]}
  ◈ 𝙻𝚒𝚗𝚔: ${link}
  
  ⚠️ _Não compartilhe com estranhos!_
  `.trim();

      await socket.sendMessage(remoteJid, {
        text: linkText,
        contextInfo: {
          mentionedJid: [webMessage.key.participant],
          externalAdReply: {
            title: "🌑 𝐂𝐎𝐍𝐕𝐈𝐓𝐄 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎 ✅",
            body: "𝙏𝙤𝙦𝙪𝙚 𝙖𝙦𝙪𝙞 𝙥𝙖𝙧𝙖 𝙘𝙤𝙥𝙞𝙖𝙧 𝙤 𝙡𝙞𝙣𝙠",
            mediaType: 1,
            thumbnailUrl: "https://i.imgur.com/uRovvWp.png", 
            sourceUrl: link
          }
        }
      }, { quoted: webMessage });

    } catch (error) {
      // 3. Se der erro 500, o bot responde educadamente em vez de cair
      console.error("ERRO NO LINK:", error);
      await socket.sendMessage(remoteJid, { 
        text: "❌ *FALHA NO SERVIDOR* ❌\n\nO WhatsApp recusou o pedido do link. \n\n*Possíveis causas:*\n1. O bot foi removido e voltou agora (tire o ADM e coloque de novo).\n2. O grupo atingiu o limite de convites.\n3. Instabilidade momentânea." 
      }, { quoted: webMessage });
    }
  },
};
