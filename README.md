# 🌑 m7zinXx-bot ✅

<p align="center">
  <img src="https://i.imgur.com/uRovvWp.png" width="200" height="200" style="border-radius: 50%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vers%C3%A3o-1.0.0-black?style=for-the-badge" alt="Versão">
  <img src="https://img.shields.io/badge/Plataforma-WhatsApp-25D366?style=for-the-badge&logo=whatsapp" alt="WhatsApp">
</p>

<p align="center">
  <blockquote> 
    <b>𝐦𝟕𝐳𝐢𝐧𝐗𝐱 - 𝐀𝐃𝐌𝐈𝐍 ✅</b><br>
    <i>𝙨𝙚 𝘿𝙚𝙪𝙨 𝙚́ 𝙥𝙤𝙧 𝙣𝙤𝙞𝙨, 𝙦𝙪𝙚𝙢 𝙨𝙚𝙧𝙖́ 𝙘𝙤𝙣𝙩𝙧𝙖 𝙣𝙤́𝙨?</i>
  </blockquote>
</p>

---

## 📖 Sobre o Projeto
O **m7zinXx-bot** é uma automação multifuncional para WhatsApp, desenvolvida para oferecer ferramentas de administração de grupos, diversão e utilitários premium com selo de verificado oficial.

---

## 🚀 Guia de Instalação

### 1. Pré-requisitos
Certifique-se de ter os seguintes itens instalados no seu **Termux, VPS ou PC**:
* **Node.js** (v20 ou superior)
* **FFMPEG** (Para conversão de mídia)
* **Git** (Para gerenciar o repositório)

### 2. Clonagem e Instalação
Execute os comandos abaixo no terminal:
```bash
# Clone o repositório
git clone [https://github.com/m7zinXx/m7zinXx-bot.git](https://github.com/m7zinXx/m7zinXx-bot.git)

# Entre no diretório
cd m7zinXx-bot

# Instale as dependências
npm install


3.Configuração do Bot
Edite o arquivo src/config.js para personalizar sua experiência:
BOT_NAME: Nome de exibição do bot.
OWNER_LID: Seu identificador único (LID).
PREFIX: O símbolo dos comandos (ex: /).

4. Inicialização
# Iniciar o bot
npm start

Nota: Conecte via QR Code ou Código de Pareamento nas configurações de "Aparelhos Conectados" do seu WhatsApp.
🛠️ Guia do Desenvolvedor
📂 Estrutura de Pastas
Organização dos comandos dentro de src/commands/:

Pasta Finalidade Exemplo de Comando
group/ Funções de Grupo /ban, /todos
member/ Funções Gerais /sticker, /ping
owner/ Funções de Dono /reiniciar, /desligar


📝 Criando um Novo Comando
Crie um arquivo .js em uma das pastas acima seguindo o padrão:
import { PREFIX } from "../../config.js";

export default {
  name: "nome-do-comando",
  description: "Descrição da função",
  commands: ["atalho1", "atalho2"],
  handle: async ({ sendText, fullArgs }) => {
    // Escreva sua lógica aqui
    await sendText("🌑 m7zinXx-bot respondendo com sucesso! ✅");
  }
};

👨‍💻 Desenvolvedor
Nome: Miguel (m7zinXx)
Instagram: @miglz77x
<p align="center">
<b>© 2026 m7zinXx Bot - Todos os direitos reservados.</b>
</p>

