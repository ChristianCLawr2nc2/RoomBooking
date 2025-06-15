# RoomBooking

# 📌 Sistema de Gerenciamento de Reservas de Salas

![Room Booking - Web Project](https://github.com/ChristianCLawr2nc2/Projeto-Individual---M2/blob/main/document/assets/Logo/logo.png)

---

## 👨‍🎓 Desenvolvedores: 

- <a href="https://www.linkedin.com/in/christian-de-carvalho-lawrence/">Christian de Carvalho Lawrence</a>

---

## 📝 Descrição

O que o sistema em questão visa tornar mais fácil o agendamento e reserva de salas, em universidades por exemplo. Isso porque, existem estudantes e professores que precisam de determinada sala para uma reunião, estudo em grupo ou até mesmo uma apresentação, porém, têm dificuldades em torno disso devido à organização da mesma pois os processos de reserva de sala são desorganizados, no entanto, manual ou mal distribuídos.
Para isso, a solução proposta é o desenvolvimento de uma aplicação web simples e clara que permitiria aos usuários consultar salas em tempo real que estão disponíveis, agendar, de inserir e cancelar agendamento. Ele também fará um painel administrativo que será destinado a ser utilizado pelos responsáveis pelas salas para alimentar horários e aprovações.
Este projeto é uma forma de aplicar conhecimentos de front-end, back-end e ainda banco de dados e mesmo a criação de uma interface visualmente viável ao espectador e funcional.

---

## 📁 Estrutura de pastas
```plaintext
ROOMBOOKING/
├── assets/
├── config/
├── controllers/
├── documents/
│ └── assets/
├── models/
├── node_modules/
├── public/
├── routes/
├── scripts/
├── tests/
├── views/
│ ├── components/
│ ├── css/
│ ├── layout/
│ ├── pages/
│ ├── partials/
├── .env
├── .gitignore
├── app.js
├── jest.config.js
├── package-lock.json
├── package.json
├── README.md
├── rest.http
└── server.js
```
---

## 🚀 Tecnologias Utilizadas
- **Frontend:** 
- **Backend:** 
- **Banco de Dados:** 

---

## ✅ Funcionalidades
- ✅ Cadastro de usuários
- ✅ Login e autenticação
- ✅ Visualização de salas disponíveis
- ✅ Reserva de salas
- ✅ Visualização de reservas

---

## 💻 Configuração para desenvolvimento e execução do código

Aqui estão todas as instruções necessárias para a instalação de bibliotecas, serviços e etc. para que seja efetuado o teste do código em qualquer máquina.

1. Baixar e instalar o node.js: [https://nodejs.org/pt-br/](https://nodejs.org/pt-br/) (versão 16.15.1 LTS)

## 🛠️ Como Rodar o Projeto

Siga o passo a passo abaixo para instalar e executar o projeto localmente:

### 1. 📦 Clone o repositório

```bash
git clone https://github.com/ChristianCLawr2nc2/RoomBooking.git
cd RoomBooking
```

2. 📁 Instale as dependências
Certifique-se de que o Node.js esteja instalado (versão 18 ou superior recomendada). Em seguida, instale as dependências com:

```bash
npm install express bycript dotenv ejs multer pg tailwindcss body-parser express-session express-validator
```

3. ⚙️ Configure o banco de dados
Crie um banco de dados PostgreSQL local com o nome RoomBooking ou conforme preferir.

Em seguida, configure o arquivo .env com os dados da sua conexão:

DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=roombooking
DB_PORT=5432

4. ▶️ Inicie o servidor

```bash
node app.js
```

O servidor será iniciado em: http://localhost:3000

---
