import { exec as execChild } from "child_process";
import { PREFIX } from "../../config.js";
import { DangerError } from "../../errors/index.js";
import { isBotOwner } from "../../middlewares/index.js";

const DANGEROUS_COMMANDS = [
  ":()", "mkfs", "fdisk", "parted", "format", "halt", 
  "poweroff", "reboot", "shutdown", "init 0", "init 6",
];

const DANGEROUS_PATTERNS = [
  /:\(\)\s*\{/i, /rm\s+-rf\s+\/($|\s)/i, /rm\s+-rf\s+~\/\*/i,
  /rm\s+-rf\s+\*($|\s)/i, /dd\s+.*of=\/dev\/sd[a-z]/i,
  /mkfs\.[a-z]+\s+\/dev/i, /:\(\)\s*\{.*fork/i, /curl.*\|\s*bash/i,
  /wget.*\|\s*bash/i, /curl.*\|\s*sh/i, /wget.*\|\s*sh/i,
  /chmod\s+777\s+\//i, /chown\s+.*\s+\//i, />\s*\/dev\/sd[a-z]/i,
];

function isSafeCommand(command) {
  const trimmedCommand = command.trim();
  const lowerCommand = trimmedCommand.toLowerCase();
  for (const dangerous of DANGEROUS_COMMANDS) {
    if (lowerCommand.includes(dangerous.toLowerCase())) {
      return { safe: false, reason: `Comando perigoso detectado: ${dangerous}` };
    }
  }
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(trimmedCommand)) {
      return { safe: false, reason: `Padrão perigoso detectado: operação destrutiva` };
    }
  }
  return { safe: true };
}

export default {
  name: "exec",
  description: "Executa comandos do terminal (Apenas Dono).",
  commands: ["exec", "terminal"],
  usage: `${PREFIX}exec comando`,

  handle: async ({ socket, remoteJid, fullArgs, userLid }) => {
    // --- TRAVA DE SEGURANÇA M7ZINXX ---
    if (!isBotOwner({ userLid })) {
      return socket.sendMessage(remoteJid, { text: "❌ *ACESSO NEGADO*\n\nEste comando é de uso exclusivo do meu Dono." });
    }

    if (!fullArgs) {
      throw new DangerError(`Uso correto: ${PREFIX}exec <comando>`);
    }

    const safetyCheck = isSafeCommand(fullArgs);
    if (!safetyCheck.safe) {
      throw new DangerError(`⛔ *BLOQUEIO DE SEGURANÇA*\n\nMotivo: ${safetyCheck.reason}`);
    }

    const timeoutMs = 15000;
    const maxBuffer = 1024 * 1024;

    execChild(fullArgs, { timeout: timeoutMs, maxBuffer: maxBuffer }, async (error, stdout, stderr) => {
      let output = stdout || stderr || "Comando executado sem saída.";
      
      if (error) {
        if (error.code === "ETIMEDOUT") output = "⏱️ Erro: Timeout de 15 segundos.";
        else output = error.message;
      }

      const maxOutputLength = 3500;
      if (output.length > maxOutputLength) {
        output = output.substring(0, maxOutputLength) + "\n\n... (saída truncada)";
      }

      const responseText = `
╭━━━━━━━━━━━━━━━━╮
 🖥️  𝐓𝐄𝐑𝐌𝐈𝐍𝐀𝐋 𝐌𝟕
╰━━━━━━━━━━━━━━━━╯

◈ 𝙲𝚘𝚖𝚊𝚗𝚍𝚘: \`${fullArgs}\`

◈ 𝚁𝚎𝚜𝚞𝚕𝚝𝚊𝚍𝚘:
\`\`\`bash
${output.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim()}
\`\`\`

`.trim();

      // Envio com o selo de verificado
      await socket.sendMessage(remoteJid, {
        text: responseText,
        contextInfo: {
          externalAdReply: {
            title: "🌑 𝐦𝟕𝐳𝐢𝐧𝐗𝐱 - 𝐄𝐗𝐄𝐂𝐔𝐓𝐎𝐑 ✅",
            body: `𝙨𝙚 𝘿𝙚𝙪𝙨 𝙚́ 𝙥𝙤𝙧 𝙣𝙤𝙞𝙨, 𝙦𝙪𝙚𝙢 𝙨𝙚𝙧𝙖́ 𝙘𝙤𝙣𝙩𝙧𝙖 𝙣𝙤́𝙨?`,
            mediaType: 1,
            thumbnailUrl: "https://i.imgur.com/uRovvWp.png",
            sourceUrl: "https://instagram.com/miglz77x"
          }
        }
      });
    });
  },
};
