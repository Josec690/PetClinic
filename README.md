# Projeto Castração para Hospitais Públicos Veterinários 🐾

## 🏫 Sobre a Faculdade de Tecnologia da Zona Leste (FATEC-ZL)

Este projeto é desenvolvido por alunos da Faculdade de Tecnologia da Zona Leste, um estabelecimento conhecido por sua excelência em tecnologia e inovação. Nosso curso nos desafia a aplicar o conhecimento teórico em projetos práticos, preparando-nos para as demandas do mercado tecnológico.

## 👥 Equipe do Projeto

Este projeto foi realizado com a colaboração dos seguintes membros, listados em ordem alfabética:
- <a href="https://www.linkedin.com/in/rirfit/">Gabriel O.</a>
- <a href="https://www.linkedin.com/in/gustavo-morais-arruda/">Gustavo M.</a>
- <a href="https://www.linkedin.com/in/joaomaximiano/">João M.</a>
- <a href="https://www.linkedin.com/in/joseclaudiley/">José C.</a>
- <a href="https://www.linkedin.com/in/miguelgomescy/">Miguel G.</a>

## 🎖️ Menção Honrosa | Professor Orientador

Este projeto foi realizado com a colaboração do seguinte professor:
- Rogerio Pereira De Souza 👨‍🔬

## 🛠️ Ferramentas Utilizadas

Para o desenvolvimento deste projeto, utilizamos um conjunto de tecnologias modernas e eficazes. Aqui estão as principais ferramentas:

- **JavaScript (JS)**: Para scripts do lado do cliente e do servidor.
- **CSS**: Estilização e design das páginas.
- **HTML**: Estrutura básica das páginas web.
- **EJS** (Embedded JavaScript): Permite renderizar HTML dinâmico com dados do servidor.
- **Node.js**: Ambiente de execução do JavaScript no servidor.
- **MongoDB**: Sistema de gerenciamento de banco de dados para armazenar os dados.
- **Figma**: Ferramenta de design utilizada para criar o layout e a interface do usuário.
- **Git**: Sistema de controle de versão para gerenciamento de código-fonte.
- **GitHub**: Hospeda o repositório e facilita a colaboração e o controle de versão.

## 🎯 Objetivo do Projeto

O objetivo deste projeto é desenvolver um sistema web de agendamento **Pata Clinic**, facilitando a gestão de consultas e otimizando a experiência dos usuários. O sistema permitirá agendamentos online, acesso a informações médicas e muito mais, com interface amigável e segura.

---

## 🚀 Como Rodar o Projeto

### ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- [npm](https://www.npmjs.com/) (já incluído com o Node.js)
- Uma conta no [MongoDB Atlas](https://www.mongodb.com/atlas) ou uma instância local do MongoDB em execução

### 📥 1. Clone o Repositório

```bash
git clone https://github.com/Josec690/PetClinic.git
cd PetClinic
```

### 📦 2. Instale as Dependências

```bash
npm install
```

### ⚙️ 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo e preencha com seus próprios valores:

```env
MONGO_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<nome-do-banco>
JWT_SECRET=sua_chave_secreta_aqui
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_de_app
NODE_ENV=development
```

> **Atenção:** Nunca compartilhe ou suba seu arquivo `.env` para o repositório. Ele já está listado no `.gitignore`.

### ▶️ 4. Rodando o Projeto

#### Modo Desenvolvimento (com reinicialização automática via nodemon)

```bash
npm run dev
```

> No **Windows**, utilize:
> ```bash
> npm run dev:windows
> ```

#### Modo Produção

```bash
npm start
```

Após iniciar, acesse o sistema pelo navegador em:

```
http://localhost:5500
```

---

## ☁️ Deploy na Vercel

Este projeto está configurado para deploy na [Vercel](https://vercel.com/). Para fazer o deploy:

1. Importe o repositório na Vercel.
2. Configure as variáveis de ambiente (`MONGO_URI`, `JWT_SECRET`, `EMAIL_USER`, `EMAIL_PASS`) no painel da Vercel em **Settings → Environment Variables**.
3. A Vercel irá detectar automaticamente o arquivo `vercel.json` e realizar o build.

---

## 🌟 Como Contribuir

Para contribuir com o projeto, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma nova branch para suas modificações:
   ```bash
   git checkout -b feature/nome_da_nova_feature
   ```
3. Faça commit de suas alterações:
   ```bash
   git commit -m 'Adicionar algumas funcionalidades'
   ```
4. Faça push para a branch:
   ```bash
   git push -u origin feature/nome_da_nova_feature
   ```
5. Abra um Pull Request.

---

Agradecemos o interesse e a colaboração de todos! Vamos juntos melhorar o atendimento e a gestão da Clínica Pata Clinic! 🐾
