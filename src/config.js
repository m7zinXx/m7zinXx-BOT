import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIGURAÇÕES DE IDENTIDADE ---

// Prefixo padrão dos comandos.
export const PREFIX = "/";

// Nome oficial do seu projeto.
export const BOT_NAME = "m7zinXx Bot";

// Emoji oficial do bot.
export const BOT_EMOJI = "🌑";

// LID do bot (Seu número configurado).
export const BOT_LID = "558120117031@s.whatsapp.net";

// LID do dono do bot (Você, Miguel).
export const OWNER_LID = "136464113340513@lid";

// --- CONFIGURAÇÕES DE DIRETÓRIOS ---

export const COMMANDS_DIR = path.join(__dirname, "commands");
export const DATABASE_DIR = path.resolve(__dirname, "..", "database");
export const ASSETS_DIR = path.resolve(__dirname, "..", "assets");
export const TEMP_DIR = path.resolve(__dirname, "..", "assets", "temp");

// --- SEGURANÇA E PERFORMANCE ---

// Delay para evitar banimento do WhatsApp.
export const TIMEOUT_IN_MILLISECONDS_BY_EVENT = 700;

// Modo desenvolvedor (Logs no terminal).
export const DEVELOPER_MODE = false;

// Versão estável do WhatsApp Web.
export const WAWEB_VERSION = [2, 3000, 1032862259];

// --- API'S E INTEGRAÇÕES ---

// Spider X API (Downloads e IA).
export const SPIDER_API_BASE_URL = "https://api.spiderx.com.br/api";
export const SPIDER_API_TOKEN = "VHdaxfgVEzX8whkw1IMv";

// API de Linker (Substitua pela sua chave quando tiver).
export const LINKER_BASE_URL = "https://linker.devgui.dev/l/rt0FLPGl"; 
export const LINKER_API_KEY = ""; 

// OpenAI / Gemini (IA Adicional).
export const OPENAI_API_KEY = "";

// --- CONFIGURAÇÕES DE GRUPO E PROXY ---

export const ONLY_GROUP_ID = "";

export const PROXY_PROTOCOL = "http";
export const PROXY_HOST = "";
export const PROXY_PORT = "";
export const PROXY_USERNAME = "";
export const PROXY_PASSWORD = "";
