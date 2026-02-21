/**
 * Logs
 *
 * @author Dev Gui
 */
import pkg from "../../package.json" with { type: "json" };

export function sayLog(message) {
  console.log("\x1b[36m[M7ZINXX BOT | TALK]\x1b[0m", message);
}

export function inputLog(message) {
  console.log("\x1b[30m[M7ZINXX BOT | INPUT]\x1b[0m", message);
}

export function infoLog(message) {
  console.log("\x1b[34m[M7ZINXX BOT | INFO]\x1b[0m", message);
}

export function successLog(message) {
  console.log("\x1b[32m[M7ZINXX BOT | SUCCESS]\x1b[0m", message);
}

export function errorLog(message) {
  // --- TRAVA DE SEGURANÇA CONTRA FLOOD DE RATE-LIMIT ---
  const errorMsg = String(message);
  if (errorMsg.includes('rate-overlimit') || errorMsg.includes('429')) {
    return; // O erro acontece, mas não polui o seu terminal
  }
  
  console.log("\x1b[31m[M7ZINXX BOT | ERROR]\x1b[0m", message);
}

export function warningLog(message) {
  console.log("\x1b[33m[M7ZINXX BOT | WARNING]\x1b[0m", message);
}

export function bannerLog() {
  console.log(`\x1b[35m
  ███╗   ███╗███████╗███████╗██╗███╗   ██╗██╗  ██╗██╗  ██╗
  ████╗ ████║╚════██║╚══███╔╝██║████╗  ██║╚██╗██╔╝╚██╗██╔╝
  ██╔████╔██║    ██╔╝  ███╔╝ ██║██╔██╗ ██║ ╚███╔╝  ╚███╔╝ 
  ██║╚██╔╝██║   ██╔╝  ███╔╝  ██║██║╚██╗██║ ██╔██╗  ██╔██╗ 
  ██║ ╚═╝ ██║   ██║   ███████╗██║██║ ╚████║██╔╝ ██╗██╔╝ ██╗
  ╚═╝     ╚═╝   ╚═╝   ╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝\x1b[0m`);
  
  console.log(`\x1b[36m             🌑 𝐌𝟕𝐙𝐈𝐍𝐗𝐗 𝐒𝐘𝐒𝐓𝐄𝐌 𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄𝐃 ✅\x1b[0m`);
  console.log(`\x1b[36m            🤖 Versão: \x1b[0m${pkg.version}\n`);
}
