
import { DEVELOPER_MODE } from "../config.js";
import { badMacHandler } from "../utils/badMacHandler.js";
import { checkIfMemberIsMuted } from "../utils/database.js";
import { dynamicCommand } from "../utils/dynamicCommand.js";
import {
  GROUP_PARTICIPANT_ADD,
  GROUP_PARTICIPANT_LEAVE,
  isAddOrLeave,
  isAtLeastMinutesInPast,
} from "../utils/index.js";
import { loadCommonFunctions } from "../utils/loadCommonFunctions.js";
import { errorLog, infoLog } from "../utils/logger.js";
import { customMiddleware } from "./customMiddleware.js";
import { messageHandler } from "./messageHandler.js";
import { onGroupParticipantsUpdate } from "./onGroupParticipantsUpdate.js";

export async function onMessagesUpsert({ socket, messages, startProcess }) {
  if (!messages.length) return;

  for (const webMessage of messages) {
    if (webMessage.key.fromMe) continue;

    try {
      const timestamp = webMessage.messageTimestamp;
      const jid = webMessage?.key?.remoteJid;
      if (!jid) continue;

      const isGroup = jid.endsWith("@g.us");

      // 1. CARREGA FUNÇÕES BÁSICAS
      const commonFunctions = loadCommonFunctions({ socket, webMessage });
      if (!commonFunctions) continue;

      // 2. MIDDLEWARE DE BLOQUEIO (Noah, isso aqui deve vir ANTES de tudo)
      // Se o grupo estiver em /off, o middleware vai lançar um erro e parar aqui.
      await customMiddleware({ socket, webMessage, type: "message", commonFunctions });

      if (DEVELOPER_MODE) {
        infoLog(`\n\n⪨========== [ MENSAGEM RECEBIDA ] ==========⪩ \n\n${JSON.stringify(webMessage, null, 2)}`);
      }

      // 3. PROCESSA A MENSAGEM
      if (webMessage?.message) {
        await messageHandler(socket, webMessage);
      }

      if (isAtLeastMinutesInPast(timestamp)) continue;

      // --- CORREÇÃO DO ERRO .includes ---
      // Usamos o "?" para verificar se o StubType existe antes de testar o includes
      if (webMessage.messageStubType && isAddOrLeave.includes(webMessage.messageStubType)) {
        let action = webMessage.messageStubType === GROUP_PARTICIPANT_ADD ? "add" : "remove";
        const participantData = webMessage.messageStubParameters?.[0];

        if (participantData) {
          await customMiddleware({ socket, webMessage, type: "participant", action, data: participantData, commonFunctions: null });
          await onGroupParticipantsUpdate({ data: participantData, remoteJid: jid, socket, action });
        }
        return;
      }

      // --- VERIFICAÇÃO DE ADM PARA MUTE ---
      if (isGroup) {
        let botIsAdmin = false;
        try {
          const metadata = await socket.groupMetadata(jid);
          const botId = socket.user.id.split(':')[0] + '@s.whatsapp.net';
          botIsAdmin = !!metadata.participants.find(p => p.id === botId)?.admin;
          
          const participant = webMessage?.key?.participant?.replace(/:[0-9][0-9]|:[0-9]/g, "");
          if (checkIfMemberIsMuted(jid, participant)) {
            if (botIsAdmin) {
              await socket.sendMessage(jid, { delete: webMessage.key });
            } else {
              infoLog(`[MUTE] Mensagem ignorada em ${jid} (Bot não é ADM)`);
            }
            return;
          }
        } catch (e) {
          // Falha silenciosa se não conseguir pegar metadata
        }
      }

      // 4. EXECUTA COMANDOS DINÂMICOS
      await dynamicCommand(commonFunctions, startProcess);

    } catch (error) {
      // Ignora o bloqueio proposital do nosso middleware para não floodar o erro
      if (error.message === "BLOCK_INACTIVE_GROUP" || error === "SILENT_BLOCK") return;

      if (error.message.includes('rate-overlimit')) continue;
      if (badMacHandler.handleError(error, "message-processing")) continue;
      
      if (!error.message.includes('forbidden') && !error.message.includes('not-authorized')) {
        errorLog(`🔥 Erro no Upsert: ${error.message}`);
      }
      continue;
    }
  }
}
