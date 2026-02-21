import { PREFIX } from "../../config.js";

export default {
  name: "menu",
  description: "Menu Dark M7zinXx",
  commands: ["menu", "help"],
  usage: `${PREFIX}menu`,

  // ✅ Adicionado webMessage para pegar o nome do usuário
  handle: async ({ remoteJid, socket, webMessage }) => {
    // ✅ Pega o nome de quem mandou a mensagem
    const name = webMessage.pushName || "Usuário";

    const menuText = `
  ╭━━━━━━━━━━━━━━━╮
       𝐌𝟕𝐳𝐢𝐧𝐗𝐱 𝐁𝐎𝐓 
  ╰━━━━━━━━━━━━━━━╯
  ◈ 𝚄𝚜𝚎𝚛: ${name}
  ◈ 𝙿𝚛𝚎𝚏𝚒𝚡: [ ${PREFIX} ]
  ◈ 𝚁𝚎𝚍𝚎: ATIVO
﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏
  ╭─〔  🤖  𝐈.𝐀  〕─⊷
  ┝  ⌬ ${PREFIX}ia
  ┝  ⌬ ${PREFIX}gpt
  ┝  ⌬ ${PREFIX}img
  ╰──────────────╼
  ╭─〔  🎭  𝐒𝐓𝐈𝐂𝐊𝐄𝐑  〕─⊷
  ┝  ⌬ ${PREFIX}s
  ┝  ⌬ ${PREFIX}wm
  ┝  ⌬ ${PREFIX}attp
  ╰──────────────╼
  ╭─〔  📥  𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃  〕─⊷
  ┝  ⌬ ${PREFIX}play
  ┝  ⌬ ${PREFIX}yt
  ┝  ⌬ ${PREFIX}tt
  ╰──────────────╼
  ╭─〔  ⚙️  𝐒𝐘𝐒𝐓𝐄𝐌  〕─⊷
  ┝  ⌬ ${PREFIX}ping
  ┝  ⌬ ${PREFIX}dono
  ┝  ⌬ ${PREFIX}regras
  ╰──────────────╼`.trim();

    await socket.sendMessage(remoteJid, {
      text: menuText,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 999,
        externalAdReply: {
          title: "🌑 𝐦𝟕𝐳𝐢𝐧𝐗𝐱 𝐛𝐨𝐭 - 𝐎𝐅𝐅𝐈𝐂𝐈𝐀𝐋 ✅",
          body: `𝙨𝙚 𝘿𝙚𝙪𝙨 𝙚́ 𝙥𝙤𝙧 𝙣𝙤𝙞𝙨, 𝙦𝙪𝙚𝙢 𝙨𝙚𝙧𝙖́ 𝙘𝙤𝙣𝙩𝙧𝙖 𝙣𝙤́𝙨?`,
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
  },
};
