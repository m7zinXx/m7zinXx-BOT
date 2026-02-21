import { PREFIX } from "../../config.js";

export default {
  name: "dono",
  description: "Exibe o contato do proprietário",
  commands: ["dono", "owner", "criador"],
  usage: `${PREFIX}dono`,

  handle: async ({ remoteJid, socket, webMessage }) => {
    const nomeDono = "m7zinXx 👑"; 
    const numeroDono = "558394190215"; 

    const donoText = `
  ╭━━━━━━━━━━━━━━━╮
      👑  𝐎𝐖𝐍𝐄𝐑  𝐈𝐍𝐅𝐎
  ╰━━━━━━━━━━━━━━━╯
  
  ◈ 𝙳𝚘𝚗𝚘: ${nomeDono}
  ◈ 𝚂𝚝𝚊𝚝𝚞𝚜: Online 🟢
  
  ┌──〔 🔗 𝐂𝐎𝐍𝐄𝐗𝐎̃𝐄𝐒 〕──┐
  ┆
  ┆  🔘 *INSTAGRAM:*
  ┆  instagram.com/miglz77x
  ┆
  ┆  🔘 *WHATSAPP:*
  ┆  wa.me/${numeroDono}
  ┆
  └──────────────╼ 🌑
`.trim();

    await socket.sendMessage(remoteJid, {
      text: donoText,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 999,
        showAdAttribution: true, 
        externalAdReply: {
          title: "🌑 𝐌𝟕𝐳𝐢𝐧𝐗𝐱 𝐎𝐅𝐅𝐈𝐂𝐈𝐀𝐋 ✅",
          body: "COMI O C# DE QUEM LEU",
          mediaType: 1,
          previewType: "PHOTO",
          thumbnailUrl: "https://i.imgur.com/uRovvWp.png", 
          sourceUrl: `https://wa.me/${numeroDono}` 
        }
      }
    });
  },
};
