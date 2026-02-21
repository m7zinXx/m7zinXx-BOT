import { PREFIX } from "../../config.js";

export default {
  name: "menuadm",
  description: "Exibe o painel de comandos administrativos",
  commands: ["menuadm", "adm", "admin"],
  usage: `${PREFIX}menuadm`,

  handle: async ({ remoteJid, socket, webMessage }) => {
    const name = webMessage.pushName || "Usuário";

    const menuAdmText = `
  ╭━━━━━━━━━━━━━━━╮
      𝐌𝟕𝐳𝐢𝐧𝐗𝐱 𝐀𝐃𝐌𝐈𝐍
  ╰━━━━━━━━━━━━━━━╯
  ◈ 𝚄𝚜𝚎𝚛: ${name}
  ◈ 𝚂𝚝𝚊𝚝𝚞𝚜: Painel Admin 🔐
  ◈ 𝙿𝚛𝚎𝚏𝚒𝚡𝚘: [ ${PREFIX} ]

  ╭─〔 👮 𝐀𝐃𝐌𝐈𝐍𝐒 〕─⊷
  ┝ ⌬ ${PREFIX}abrir | ${PREFIX}fechar
  ┝ ⌬ ${PREFIX}ban | ${PREFIX}hidetag
  ┝ ⌬ ${PREFIX}mute | ${PREFIX}unmute
  ┝ ⌬ ${PREFIX}promover | ${PREFIX}rebaixar
  ┝ ⌬ ${PREFIX}welcome | ${PREFIX}anti-link
  ┝ ⌬ ${PREFIX}anti-audio | ${PREFIX}limpar
  ┝ ⌬ ${PREFIX}revelar | ${PREFIX}auto-responder
  ╰──────────────╼
  `.trim();

    await socket.sendMessage(remoteJid, {
      text: menuAdmText,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 999,
        externalAdReply: {
          title: "👮 𝐌𝟕𝐳𝐢𝐧𝐗𝐱 - 𝐏𝐀𝐈𝐍𝐄𝐋 𝐀𝐃𝐌 ✅",
          body: `𝙨𝙚 𝘿𝙚𝙪𝙨 𝙚́ 𝙥𝙤𝙧 𝙣𝙤𝙞𝙨, 𝙦𝙪𝙚𝙢 𝙨𝙚𝙧𝙖́ 𝙘𝙤𝙣𝙩𝙧𝙖 𝙣𝙤́𝙨`,
          mediaType: 1,
          showAdAttribution: true,
          thumbnailUrl: "https://i.imgur.com/uRovvWp.png", 
          sourceUrl: "https://wa.me/558394190215"
        }
      }
    }, { 
      quoted: { 
        key: { participant: "0@s.whatsapp.net", remoteJid: "status@broadcast" }, 
        message: { conversation: "🛡️ ACESSO RESTRITO AOS ADMINISTRADORES" } 
      } 
    });
  },
};
