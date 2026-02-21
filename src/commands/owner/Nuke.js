import { OWNER_LID } from "../../config.js";

export default {
  name: "nuke",
  description: "Limpa o grupo com delay seguro para não cair.",
  commands: ["nuke", "masskick", "pika"],
  usage: "!nuke",

  handle: async ({ socket, remoteJid, userLid, isGroup }) => {
    if (userLid !== OWNER_LID) return;
    if (!isGroup) return;

    // 1. Puxa os dados atualizados
    const metadata = await socket.groupMetadata(remoteJid);
    
    // Pega os números limpos para evitar erro de comparação
    const myNumber = socket.user.id.split(':')[0].replace(/[^0-9]/g, "");
    const ownerNumber = OWNER_LID.split('@')[0].replace(/[^0-9]/g, "");

    // 2. Muda o nome do grupo
    await socket.groupUpdateSubject(remoteJid, "by m7zinXx, m7 passou a pika aqui").catch(() => {});

    // 3. Aviso com Selo de Verificado ✅
    await socket.sendMessage(remoteJid, {
      text: "☢️ *𝐒𝐘𝐒𝐓𝐄𝐌 𝐍𝐔𝐊𝐄 𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄𝐃*\n\nby m7zinXx, m7 passou a pika aqui. Limpeza iniciada em modo seguro... 👋🌑",
      contextInfo: {
        hasVerificatedBadge: true,
        isForwarded: true,
        forwardingScore: 999,
        showAdAttribution: true,
        externalAdReply: {
          title: "🌑 𝐦𝟕𝐳𝐢𝐧𝐗𝐱 𝐁𝐎𝐓 - 𝐃𝐄𝐒𝐓𝐑𝐔𝐘𝐄𝐑 ✅",
          body: `𝘼𝙥𝙤𝙘𝙖𝙡𝙞𝙥𝙨𝙚 𝙣𝙤 𝙜𝙧𝙪𝙥𝙤.`,
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

    // 4. Filtro por número de telefone (Inabalável)
    const targets = metadata.participants
      .filter(p => {
        const pNum = p.id.split('@')[0].replace(/[^0-9]/g, "");
        return pNum !== myNumber && pNum !== ownerNumber;
      })
      .map(p => p.id);

    // 5. REMOÇÃO COM DELAY DE SEGURANÇA
    for (const target of targets) {
      try {
        // Tenta remover
        await socket.groupParticipantsUpdate(remoteJid, [target], "remove");
        
        // Espera 1.5 segundos entre cada remoção (Evita queda de conexão)
        await new Promise(res => setTimeout(res, 1500));
      } catch (err) {
        console.log(`[ERRO] Não consegui remover ${target}`);
      }
    }

    // 6. Confirmação Final
    await socket.sendMessage(remoteJid, { 
      text: "✅ *𝐍𝐔𝐊𝐄 𝐂𝐎𝐍𝐂𝐋𝐔𝐈́𝐃𝐎*\n\nMiguel, a pika passou e eu ainda estou aqui! 🌑🔥",
      contextInfo: { hasVerificatedBadge: true }
    });
  },
};
