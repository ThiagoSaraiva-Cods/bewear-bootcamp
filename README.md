# Bewear Bootcamp — E-commerce com Next.js 15

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
</div>

<br />

Projeto de e-commerce construído com Next.js (App Router), focado em uma arquitetura moderna, tipada e escalável. O app inclui autenticação, catálogo de produtos, carrinho e checkout.

## ✨ **Por que este projeto se destaca?**

- 📱 **Experiência Mobile Perfeita**: Funciona perfeitamente no celular, tablet e desktop
- 🛒 **Loja Completa**: Catálogo de produtos, carrinho de compras e checkout
- 🔐 **Login Fácil**: Entre com email/senha ou sua conta Google
- ⚡ **Super Rápido**: Carrega instantaneamente e navega sem travamentos
- 🎨 **Design Moderno**: Interface bonita e fácil de usar
- 💳 **Pagamentos**: Sistema em desenvolvimento (próxima funcionalidade)

## 🛠️ **Tecnologias Utilizadas**

### **Frontend**

- **Next.js 15** - Framework React moderno
- **React 19** - Biblioteca para interfaces
- **TypeScript** - JavaScript com tipos
- **Tailwind CSS** - Estilização rápida e responsiva
- **shadcn/ui** - Componentes bonitos e prontos para uso

### **Backend & Banco de Dados**

- **PostgreSQL** - Banco de dados confiável
- **Drizzle ORM** - Facilita trabalhar com o banco
- **BetterAuth** - Sistema de login seguro

### **Outras Ferramentas**

- **React Hook Form** - Formulários fáceis de usar
- **Zod** - Validação de dados
- **React Query** - Gerenciamento de dados
- **React Number Format** - Máscaras para inputs

## 🚀 **O que a loja faz?**

### **🛒 Sistema de E-commerce**

- ✅ **Catálogo**: Veja todos os produtos organizados por categoria
- ✅ **Carrinho**: Adicione produtos e veja o total
- ✅ **Checkout**: Finalize sua compra com endereço de entrega
- 🚧 **Pagamentos**: Em desenvolvimento (próxima versão)

### **👤 Sistema de Usuários**

- ✅ **Cadastro**: Crie sua conta facilmente
- ✅ **Login**: Entre com email/senha ou Google
- ✅ **Endereços**: Salve seus endereços de entrega

### **📱 Experiência Mobile**

- ✅ **Mobile-first**: Funciona bem em dispositivos móveis
- ✅ **Responsividade**: Próxima versão com suporte a desktops
- ✅ **Rápido**: Carregamento instantâneo
- ✅ **Intuitivo**: Navegação fácil e natural
- ✅ **Acessível**: Funciona para todos os usuários

## 📁 **Como o projeto está organizado**

```
src/
├── 📱 app/              # Páginas da aplicação
│   ├── page.tsx         # Página inicial
│   ├── cart/            # Carrinho de compras
│   ├── category/        # Páginas de categoria
│   └── authentication/ # Login e cadastro
├── 🔧 actions/          # Funções do servidor
├── 🎨 components/       # Componentes reutilizáveis
├── 🗄️ db/              # Configuração do banco
├── 🪝 hooks/           # Hooks personalizados
└── 📚 lib/             # Utilitários e configurações
```

### **🎯 Principais Conceitos Aplicados**

- **Separação de responsabilidades**: Cada pasta tem sua função específica
- **Componentes reutilizáveis**: Evita repetição de código
- **Hooks personalizados**: Lógica organizada e reutilizável
- **Server Actions**: Comunicação segura com o servidor

---

## 🗄️ **Banco de Dados**

O projeto usa **PostgreSQL** com as seguintes tabelas principais:

| Tabela                   | O que armazena           |
| ------------------------ | ------------------------ |
| **👤 users**             | Dados dos usuários       |
| **👟 products**          | Catálogo de produtos     |
| **🎨 productVariants**   | Cores e tamanhos         |
| **📂 categories**        | Categorias dos produtos  |
| **🛒 cart**              | Carrinho de cada usuário |
| **📦 orders**            | Dados do pedido          |
| **🏠 shippingAddresses** | Endereços de entrega     |

**Como funciona:**

- Cada usuário tem um carrinho único
- Produtos podem ter várias cores/tamanhos
- Checkout salva os dados da compra
- Endereços ficam salvos para facilitar futuras compras

## 🚀 **Como rodar o projeto**

### **📋 O que você precisa ter instalado**

- **Node.js 18+** - [Baixar aqui](https://nodejs.org/)
- **Conta Google** (para login com Google)
- **PostgreSQL** - (para banco de dados)

---

### **⚡ Instalação rápida**

```bash
# 1️⃣ Baixe o projeto
git clone https://github.com/ThiagoSaraiva-Cods/bewear-bootcamp.git
cd bewear-bootcamp

# 2️⃣ Instale as dependências
npm install

# 3️⃣ Configure as variáveis de ambiente
cp .env.example .env
# ✏️ Edite o arquivo .env com suas informações

# 4️⃣ Configure o banco de dados
npx drizzle-kit push
npm run db:seed

# 5️⃣ Execute o projeto
npm run dev
```

🎉 **Pronto!** Abra `http://localhost:3000` no seu navegador

---

### **🔧 Configuração do arquivo .env**

Edite o arquivo `.env` com suas informações:

```env
# 🗄️ Banco de Dados
DATABASE_URL=postgresql://usuario:senha@localhost:5432/bewear

# 🔐 Chave de segurança
BETTER_AUTH_SECRET=sua-chave-secreta-super-segura-aqui

# 🌐 Google Login (opcional)
GOOGLE_CLIENT_ID=seu-google-client-id
GOOGLE_CLIENT_SECRET=seu-google-client-secret
```

**Para configurar o login com Google:**

1. Vá no [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um projeto novo
3. Ative a API do Google+
4. Crie credenciais OAuth 2.0
5. Adicione `http://localhost:3000/api/auth/callback/google` nas URLs permitidas

---

## 🔧 **Comandos disponíveis**

| Comando           | O que faz                            |
| ----------------- | ------------------------------------ |
| `npm run dev`     | 🚀 Roda o projeto em desenvolvimento |
| `npm run build`   | 📦 Prepara para produção             |
| `npm run start`   | ▶️ Roda a versão de produção         |
| `npm run lint`    | 🔍 Verifica se o código está ok      |
| `npm run db:seed` | 🌱 Adiciona produtos de exemplo      |

---

## 🎨 **Design e Responsividade**

### **📱 Funciona em todos os dispositivos**

O projeto foi feito pensando primeiro no celular, depois adaptado para tablet. Em breve estará totalmente responsivo para todas as telas:

- **📱 Celular**: Totalmente otimizado
- **📟 Tablet**: Totalmente otimizado
- **💻 Desktop**: Em breve (próxima versão)

### **🎨 Componentes bonitos**

Usa a biblioteca **shadcn/ui** que oferece:

- ✅ **Botões** - Vários estilos diferentes
- ✅ **Formulários** - Campos com validação automática
- ✅ **Cards** - Para mostrar produtos
- ✅ **Modais** - Para confirmações
- ✅ **Navegação** - Menus fáceis de usar

### **♿ Acessibilidade**

- **Navegação por teclado** - Componentes com foco visível
- **Formulários acessíveis** - Validação e estados de erro claros
- **Textos alternativos** - Em imagens importantes
- **Componentes semânticos** - Usando shadcn/ui com boas práticas

---

## 🔒 **Segurança**

### **🛡️ Como protegemos seus dados**

| O que protegemos | Como fazemos                           |
| ---------------- | -------------------------------------- |
| **Login**        | Senhas criptografadas + Google OAuth   |
| **Dados**        | Validação em todas as entradas         |
| **Banco**        | Proteção contra ataques SQL            |
| **Senhas**       | Nunca salvamos senhas em texto         |
| **Formulários**  | Verificação dupla (cliente + servidor) |

### **✅ Validações implementadas**

- ✅ **E-mail** - Precisa ser um e-mail válido
- ✅ **Senhas** - Mínimo de segurança exigido
- ✅ **CEP** - Formato brasileiro (00000-000)
- ✅ **Telefone** - Com máscara automática
- ✅ **Campos obrigatórios** - Aviso imediato se estiver vazio

## 🚀 **Como colocar online**

### **🌐 Vercel (mais fácil)**

```bash
# 1️⃣ Instale a ferramenta da Vercel
npm i -g vercel

# 2️⃣ Faça o upload
vercel

# 3️⃣ Configure as variáveis no site da Vercel
```

**Por que usar a Vercel:**

- ✅ Sobe automaticamente quando você faz mudanças
- ✅ Muito rápido no mundo todo
- ✅ Fácil de configurar

### **🐳 Outras opções**

- **Netlify** - Parecido com a Vercel
- **Railway** - Inclui banco de dados
- **Heroku** - Opção gratuita

## 👨‍💻 **Sobre o desenvolvedor**

### **🎓 Contexto do projeto**

Este projeto foi desenvolvido como **projeto** do bootcamp **Full Stack Club**. É um exemplo prático de como criar uma loja online completa usando tecnologias modernas.

### **🎯 O que este projeto demonstra**

| Área               | Tecnologias                          |
| ------------------ | ------------------------------------ |
| **Frontend**       | React, Next.js, TypeScript, Tailwind |
| **Backend**        | Server Actions, APIs, Autenticação   |
| **Banco de Dados** | PostgreSQL, Modelagem de dados       |
| **Design**         | Interface responsiva, UX/UI          |
| **Qualidade**      | Código limpo, boas práticas          |

### **💡 Diferenciais**

- ✅ **Funciona bem** - Rápido e sem bugs
- ✅ **Código organizado** - Fácil de entender e modificar
- ✅ **Mobile-first** - Perfeito no celular
- ✅ **Seguro** - Proteção de dados e login
- ✅ **Moderno** - Tecnologias atuais do mercado

---

## 📞 **Contato**

Desenvolvido por **[Thiago Saraiva]**

- 📧 **E-mail**: [thiagosaraiva.cods@gmail.com]
- 💼 **LinkedIn**: [linkedin.com/in/thiago-saraiva-cods]
- 🐱 **GitHub**: [github.com/ThiagoSaraiva-Cods]

---

<div align="center">

**⭐ Gostou do projeto? Deixe uma estrela!**

_Projeto desenvolvido no Full Stack Club Bootcamp_

</div>
