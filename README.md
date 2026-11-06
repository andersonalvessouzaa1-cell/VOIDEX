# VOIDEX: Market Intelligence — Landing Page

> Protótipo local de inteligência de mercado para Warframe. Preços, vendedores e perfis são demonstrativos; não há conexão com o jogo nem garantia contra bans.

---

## 🚀 Filosofia Central de Desenvolvimento

> **"Isso torna o trading de Warframe mais fácil? Se a resposta for não, não adicione."**

- **Zero poluição visual**: Apenas as informações essenciais para tomar decisões em menos de 2 segundos.
- **Filtro Anti-AFK (planejado)**: ainda não há verificação real de presença no jogo.
- **1-Click Whisper**: Copia o comando exato formatado para o chat do jogo (`/w <nick> Olá! Gostaria de comprar...`).
- **Comparação Ducats/Platina**: Mostra a relação para o componente selecionado usando preços de exemplo. Não recomenda compra ou venda nem consulta preços reais.
- **Interação manual**: Zero leitura de memória, zero bots in-game, zero taxas sobre trades manuais e sem RMT.

---

## 🛠️ Stack Tecnológica

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components + Client Interactivity)
- **Linguagem**: TypeScript
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/) com paleta temática Void & Orokin
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Hospedagem Recomendada**: [Vercel](https://vercel.com/) (Deploy instantâneo com zero configuração)

---

## 💻 Como Rodar Localmente

1. Navegue até a pasta do projeto:
```bash
cd C:\Users\Sagitta\Projects\VOIDEX
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra no seu navegador em:
```
http://localhost:3000
```

---

## 🌐 Como Hospedar na Vercel (Passo a Passo)

### Opção 1: Via GitHub (Recomendado)
1. Crie um repositório no seu [GitHub](https://github.com/new).
2. Suba o código desta pasta para o repositório:
```bash
git init
git add .
git commit -m "feat: initial voidex landing page"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/voidex-landing.git
git push -u origin main
```
3. Acesse [vercel.com](https://vercel.com) e clique em **"Add New Project"**.
4. Importe o repositório do GitHub e clique em **"Deploy"**.
5. Em menos de 1 minuto seu site estará no ar com HTTPS gratuito!

### Opção 2: Via Vercel CLI
1. Instale o CLI da Vercel globalmente:
```bash
npm i -g vercel
```
2. Na pasta do projeto, execute:
```bash
vercel
```
3. Siga as instruções do terminal para publicar diretamente.

---

## ⚖️ Aviso Legal (Disclaimer)

O **VOIDEX** é uma ferramenta comunitária e independente desenvolvida por e para jogadores de Warframe. O VOIDEX não possui qualquer vínculo, patrocínio ou endosso da **Digital Extremes Ltd.** *Warframe* e todas as propriedades intelectuais associadas pertencem à Digital Extremes Ltd. O comércio de itens no jogo é conduzido exclusivamente de forma manual entre os próprios jogadores dentro dos servidores oficiais do jogo.

## Verificação e estado atual

Execute `npm run verify` para checar tipos, testes, lint e build. Consulte [o diagnóstico de execução](docs/EXECUTION_STATUS.md) para critérios de pronto e pendências. Os relatórios antigos de cobertura não substituem uma auditoria atual das fontes.
