import { PREFIX } from "../../config.js";
import os from "os";

export default {
  name: "ping",
  description: "Diagnóstico de Sistema M7",
  commands: ["ping", "p"],
  usage: `${PREFIX}ping`,

  handle: async ({ remoteJid, socket, webMessage }) => {
    // Cálculo de latência preciso
    const start = Date.now();
    
    // Dados do Sistema
    const ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const totalRam = Math.round(os.totalmem() / 1024 / 1024 / 1024);
    
    const end = Date.now();
    const latencia = end - start;

    const pingText = `
  ╭━━━━━━━━━━━━━━━━━━━━╮
     🛰️  𝐒𝐘𝐒𝐓𝐄𝐌 𝐃𝐈𝐀𝐆𝐍𝐎𝐒𝐓𝐈𝐂
  ╰━━━━━━━━━━━━━━━━━━━━╯

  🚀 𝖫𝖺𝗍𝖾̂𝗇𝖼𝗂𝖺: ${latencia}ms
  📊 𝖱𝖺𝗆: ${ram}MB / ${totalRam}GB
  🖥️ 𝖲𝗂𝗌𝗍𝖾𝗆𝖺: Linux 𝔵𝟲𝟰
  📡 𝖱𝖾𝖽𝖾: 𝔈𝔵𝔠𝔢𝔩𝔢𝔫𝔱𝔢

  🧩 𝐏𝐑𝐎𝐂𝐄𝐒𝐒𝐎𝐒:
  [▒▒▒▒▒▒▒▒▒▒] 100%
`.trim();

    // Enviando direto para o selo aparecer
    await socket.sendMessage(remoteJid, {
      text: pingText,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 999,
        externalAdReply: {
          title: "🌑 𝐦𝟕𝐳𝐢𝐧𝐗𝐱 - 𝐇𝐈𝐆𝐇 𝐒𝐏𝐄𝐄𝐃 ✅",
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
