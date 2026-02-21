import { OWNER_LID } from "../config.js";
import { isActiveGroup } from "../utils/database.js";

/**
 * @param {CustomMiddlewareProps} params
 */
export async function customMiddleware({
  socket,
  webMessage,
  type,
}) {
  const remoteJid = webMessage?.key?.remoteJid;
  const participant = webMessage?.key?.participant || webMessage?.key?.remoteJid;
  const userLid = participant?.replace(/:[0-9][0-9]|:[0-9]/g, "");
  
  const isGroup = remoteJid?.endsWith("@g.us");

  if (type === "message" && isGroup) {
    const isGroupActive = isActiveGroup(remoteJid);

    if (!isGroupActive) {
      
      // 🕵️ LINHAS ESPIÃS (Olhe o Termux ao mandar mensagem!)
      console.log("-----------------------------------------");
      console.log(`[ID DETECTADO]: ${userLid}`);
      console.log(`[ID NO CONFIG]: ${OWNER_LID}`);
      console.log("-----------------------------------------");

      // 🚀 EXCEÇÃO PARA O DONO
      if (userLid === OWNER_LID) {
        return;
      }

      await socket.sendMessage(remoteJid, { 
        text: "⚠️ *𝐒𝐘𝐒𝐓𝐄𝐌 𝐎𝐅𝐅*\n\nEste grupo está desativado. Apenas meu dono pode me religar aqui." 
      });

      return Promise.reject("SILENT_BLOCK"); 
    }
  }
}
