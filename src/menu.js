/**
 * Menu do bot
 *
 * @author Dev Gui
 */
import pkg from "../package.json" with { type: "json" };
import { BOT_NAME } from "./config.js";
import { getPrefix } from "./utils/database.js";
import { readMore } from "./utils/index.js";

export function menuMessage(groupJid) {
  const date = new Date();
  const prefix = getPrefix(groupJid);
  const uptime = process.uptime(); // Pega o tempo que o bot tá ligado

  // Função simples para converter segundos em formato legível
  const formatUptime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  return `┏━━━〔 ✰ ${BOT_NAME.toUpperCase()} ✰ 〕━━━┓
┃
┃ ┏━━━━━━━━━━━━━━━━━━┓
┃ ┃  ✨ INFO USUÁRIO ✨
┃ ┗━━━━━━━━━━━━━━━━━━┛
┃ ✧ ᴘʀᴇғɪxᴏ: [ ${prefix} ]
┃ ✧ ᴠᴇʀsᴀ̃ᴏ: ${pkg.version}
┃ ✧ ᴜᴘᴛɪᴍᴇ: ${formatUptime(uptime)}
┃ ✧ ᴅᴀᴛᴀ: ${date.toLocaleDateString("pt-br")}
┃ 
┣━━━━━━━━━━━━━━━━━━━━┓${readMore()}
┃
┃ ╔═════  『 👑 ᴅᴏɴᴏ 』
┃ ║ 
┃ ║ ❯ ${prefix}exec
┃ ║ ❯ ${prefix}get-group-id
┃ ║ ❯ ${prefix}off | ${prefix}on
┃ ║ ❯ ${prefix}set-menu-image
┃ ║ ❯ ${prefix}set-prefix
┃ ╚══════════════════╝
┃
┃ ╔═════  『 👮 ᴀᴅᴍɪɴs 』
┃ ║ 
┃ ║ ❯ ${prefix}abrir | ${prefix}fechar
┃ ║ ❯ ${prefix}ban | ${prefix}hidetag
┃ ║ ❯ ${prefix}mute | ${prefix}unmute
┃ ║ ❯ ${prefix}promover | ${prefix}rebaixar
┃ ║ ❯ ${prefix}welcome (1/0)
┃ ║ ❯ ${prefix}anti-link (1/0)
┃ ║ ❯ ${prefix}anti-audio (1/0)
┃ ║ ❯ ${prefix}auto-responder
┃ ║ ❯ ${prefix}limpar | ${prefix}revelar
┃ ╚══════════════════╝
┃
┃ ╔═════  『 🚀 ᴘʀɪɴᴄɪᴘᴀʟ 』
┃ ║ 
┃ ║ ❯ ${prefix}sticker | ${prefix}perfil
┃ ║ ❯ ${prefix}ping | ${prefix}cep
┃ ║ ❯ ${prefix}to-image | ${prefix}to-mp3
┃ ║ ❯ ${prefix}ttp | ${prefix}attp
┃ ║ ❯ ${prefix}fake-chat | ${prefix}rename
┃ ╚══════════════════╝
┃
┃ ╔═════  『 📥 ᴅᴏᴡɴʟᴏᴀᴅ 』
┃ ║ 
┃ ║ ❯ ${prefix}instagram | ${prefix}tik-tok
┃ ║ ❯ ${prefix}play-audio | ${prefix}play-video
┃ ║ ❯ ${prefix}yt-mp3 | ${prefix}yt-mp4
┃ ╚══════════════════╝
┃
┃ ╔═════  『 🤖 ɪɴᴛᴇʟɪɢᴇ̂ɴᴄɪᴀ 』
┃ ║ 
┃ ║ ❯ ${prefix}gemini | ${prefix}gpt-5-mini
┃ ║ ❯ ${prefix}flux | ${prefix}ia-sticker
┃ ╚══════════════════╝
┃
┃ ╔═════  『 🎡 ᴅɪᴠᴇʀsᴀ̃ᴏ 』
┃ ║ 
┃ ║ ❯ ${prefix}beijar | ${prefix}abracar
┃ ║ ❯ ${prefix}lutar | ${prefix}matar
┃ ║ ❯ ${prefix}socar | ${prefix}dado
┃ ╚══════════════════╝
┃
┃ ╔═════  『 🎨 ᴄᴀɴᴠᴀs 』
┃ ║ 
┃ ║ ❯ ${prefix}blur | ${prefix}pixel
┃ ║ ❯ ${prefix}cadeia | ${prefix}rip
┃ ║ ❯ ${prefix}bolsonaro | ${prefix}gray
┃ ╚══════════════════╝
┃
┗━━━━━━━━━━━━━━━━━━━━┛`;
}
