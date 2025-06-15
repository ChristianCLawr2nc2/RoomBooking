# Web Application Document - Projeto Individual - Módulo 2 - Inteli

**_Os trechos em itálico servem apenas como guia para o preenchimento da seção. Por esse motivo, não devem fazer parte da documentação final._**


## Room Booking - Web Project

![Logo do Projeto](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/Logo/logosite.png)

#### Autor do projeto
- <a href="http://www.linkedin.com/in/christian-de-carvalho-lawrence">Christian De Carvalho Lawrence</a>

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução

O que o sistema em questão visa tornar mais fácil o agendamento e reserva de salas, em universidades por exemplo. Isso porque, existem estudantes e professores que precisam de determinada sala para uma reunião, estudo em grupo ou até mesmo uma apresentação, porém, têm dificuldades em torno disso devido à organização da mesma pois os processos de reserva de sala são desorganizados, no entanto, manual ou mal distribuídos.
Para isso, a solução proposta é o desenvolvimento de uma aplicação web simples e clara que permitiria aos usuários consultar salas em tempo real que estão disponíveis, agendar, de inserir e cancelar agendamento. Ele também fará um painel administrativo que será destinado a ser utilizado pelos responsáveis pelas salas para alimentar horários e aprovações.
Este projeto é uma forma de aplicar conhecimentos de front-end, back-end e ainda banco de dados e mesmo a criação de uma interface visualmente viável ao espectador e funcional.
 
---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas

![Persona - Amanda Costa](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/persona/persona-pi.png)


### 2.2. User Stories (Semana 01)

- **US01** | Como estudante universitária, quero visualizar a disponibilidade das salas em tempo real, para que eu possa escolher a melhor opção para meu agendamento.

- **US02** | Como estudante, quero reservar uma sala para um horário específico, para que eu possa usá-la com segurança e organização para meu grupo de trabalho.

- **US03** | Como usuário, quero receber notificações de confirmação ou conflito de agendamento, para que eu saiba se minha reserva foi aprovada ou precisa ser alterada.

### Análise INVEST da User Story US02

- **I – Independente:** Pode ser desenvolvida separadamente da visualização de disponibilidade ou do sistema de notificações.
- **N – Negociável:** A forma como a reserva é feita (via calendário, lista ou botões) pode ser discutida conforme testes de usabilidade.
- **V – Valiosa:** Resolve diretamente a dor do usuário em reservar espaços com eficiência e segurança.
- **E – Estimável:** O esforço para desenvolver essa funcionalidade pode ser facilmente medido, já que envolve interação com o banco de dados e interface.
- **S – Pequena:** Pode ser implementada em uma sprint curta, com poucos endpoints e tela de interface.
- **T – Testável:** Pode ser testada validando se a reserva foi registrada corretamente e exibida no calendário do sistema.

---

## <a name="c3"></a>3. Projeto da Aplicação Web
---
### 3.1. Modelagem do banco de dados

![Diagrama de tabelas do banco de dados](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/modelo-banco/modelo-banco.png)

**Modelo Físico do Banco de Dados**
````sql
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tipo_usuario') THEN
    CREATE TYPE tipo_usuario AS ENUM ('admin', 'usuario');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS usuario (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  tipo tipo_usuario NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_usuario_email ON usuario(email);

CREATE TABLE IF NOT EXISTS sala (
  sala_id SERIAL PRIMARY KEY,
  numero TEXT NOT NULL UNIQUE,
  andar TEXT NOT NULL,
  disponivel BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS reserva (
  reserva_id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL,
  sala_id INTEGER NOT NULL,
  dia DATE NOT NULL,
  data_solicitacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  tempo INTERVAL NOT NULL,
  FOREIGN KEY (sala_id) REFERENCES sala(sala_id),
  FOREIGN KEY (usuario_id) REFERENCES usuario(id),
  UNIQUE(sala_id, dia, tempo)
);

INSERT INTO usuario (nome, email, tipo) VALUES
('Alice Silva', 'alice@empresa.com', 'admin'),
('Bruno Lima', 'bruno@empresa.com', 'usuario'),
('Carla Souza', 'carla@empresa.com', 'usuario');

INSERT INTO sala (numero, andar, disponivel) VALUES
('R01', '1º andar', TRUE),
('R02', '1º andar', TRUE),
('R03', '2º andar', TRUE),
('R04', '2º andar', TRUE);

INSERT INTO reserva (usuario_id, sala_id, dia, tempo) VALUES
(1, 1, '2025-05-25', '2 hours'),
(2, 2, '2025-05-25', '1 hour'),
(3, 4, '2025-05-26', '2 hours');

SELECT
  u.nome AS nome_usuario,
  s.numero AS numero_sala,
  s.andar,
  r.dia,
  r.tempo,
  r.data_solicitacao
FROM reserva r
JOIN usuario u ON r.usuario_id = u.id
JOIN sala s ON r.sala_id = s.sala_id
ORDER BY r.dia, r.tempo;
````
---
### 3.1.1 BD e Models

---

## 🧠 Models no Sistema ##
1. Sala (Model de Sala)
Responsável por representar uma sala física do sistema. Este model deve conter os atributos e métodos necessários para criar, buscar, atualizar e excluir salas no banco de dados.

Campos comuns esperados:

sala_id (identificador único da sala)

nome (nome da sala)

capacidade (número máximo de pessoas)

localizacao (informações de onde fica a sala)

---
Funções típicas:

getAllSala(): Retorna todas as salas cadastradas

getSalaById(sala_id): Busca uma sala específica por ID

createSala(dados): Cria uma nova sala no banco

updateSala(sala_id, dados): Atualiza os dados de uma sala

deleteSala(sala_id): Remove a sala do banco

2. Reserva (Model de Reserva)
Model que representa a reserva de uma sala. Ele está associado a uma sala e possivelmente a um usuário (se houver controle de usuários).

Campos comuns esperados:

reserva_id

usuario_id (cahve estrangeira para usuario)

sala_id (chave estrangeira para Sala)

data (data da reserva)

duracao (duração da reserva)

---
Funções típicas:

getAllReservas()

getReservaById(reserva_id)

createReserva(dados)

updateReserva(reserva_id, dados)

deleteReserva(reserva_id)

3. User (Model de Usuário)
Model utilizado para representar usuários do sistema, caso haja controle de acesso ou cadastro.

Campos comuns esperados:

id

nome

email

senha (com hash)

tipo (admin, usuário comum)

---
Funções típicas:

getAllUsers()

getUserById(id)

createUser(dados)

updateUser(id, dados)

deleteUser(id)

### 3.2. Arquitetura

---

![Diagrama de Arquitetura](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/diagramas/diagrama-de-arquitetura.png)

---
Parágrafos explicativos sobre os:
**Models**
**Views**
**Controllers**

## 🧠 Model ##
A camada Model trata dos dados e da lógica de negócios, além de lidar também com o banco de dados. Aqui, ele cria as memdescrições estruturais-data e métodos que fazem ações desses dados como busca, criação, atualização, remoção, por exemplo. Os arquivos dessa camada estão localizados em models/ e herdam as configurações do arquivo(s) de configuração em config/ e do arquivo .env já mencionado: no arquivo(s) de configuração estão inseridas informações como configurações para acesso ao banco de dados em si dentro (PostgreSQL, por exemplo).

## 🎮 Controller  ##
A Controller camada é o cérebro que conecta a View com o Model. Assim, quando o usuário faz uma requisição  ao sistema (por exemplo, navegar em uma rota /salas ou um formulário de reserva), esta requisição será enviada para a Controller via rotas configurada em routes/. O controller lê a ação, consulta os dados no Model, e escolhe a resposta a retornar; elas podem renderizar páginas (no caso da view) ou retornar JSON  para API’s REST neste caso. Arquivos desta camada estão salvas na pasta controllers …. 

## 👁️ View  ##
Essa é a camada View que concretiza a visualização da interface para o usuário. Na sua infra, ela está no diretório views/ usando a engine de templates EJS. Durante a ativação, quando o controller quer renderizar, passa os dados do model  “Model”   para os arquivos .ejs da pasta view que por sua vez exibe ao usuário do sistema, formatado para HTML. A pasta views/ possui uma organização interna em várias subpastas como pages (cadastros com todas as suas paginas), layout (estrutura base das páginas), partials  (bloco reutilizável), components/p/  css e usa arquivos estáticos public/.

---

### 3.3. Wireframes

![Wireframe Completo](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/Wireframe/wireframe.png)

![Tela de Login](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/Wireframe/1.png)

![Tela de Principal](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/Wireframe/2.png)

![Tela de Reserva](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/Wireframe/3.png)

![Tela de Visualização das Reservas](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/Wireframe/4.png)

### 3.4. Guia de estilos

![Mini guia de estilos](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/estilos/mini-guia-de-estilos.png)

![Guia de Estilos](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/estilos/PAF.png)



### 3.5. Protótipo de alta fidelidade

![Tela de Login](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/prototipo/login.png)

![Tela Home do site](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/prototipo/home.png)

![Tela para reservar as salas](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/prototipo/reservando.png)

![Tela das reservas do usuário](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/prototipo/reservas.png)

[Link de Protótipo no Figma](https://www.figma.com/design/ui33OggzNK9Z0dYD8Ws81B/PAF?node-id=0-1&p=f&t=bCsRVbXvzJZOUZ15-0)

### 3.6. WebAPI e endpoints

# 📚 Explicação dos Endpoints do Sistema de Gerenciamento de Salas

---

## 📄 Páginas Renderizadas (EJS)

| Método | Rota        | Descrição                                                | Origem                          |
|--------|-------------|----------------------------------------------------------|---------------------------------|
| GET    | `/`         | Página inicial com lista de salas                        | `router.get('/')`, `app.get('/')` |
| GET    | `/about`    | Página sobre, com conteúdo de reservas                   | `router.get('/about')`          |
| GET    | `/reserva`  | Página de reserva                                        | `router.get('/reserva')`        |
| GET    | `/salas`    | Página de visualização de salas                          | `router.get('/salas')`, `salas.index` |
| GET    | `/salas`    | Visualização de salas usando `mostrarSalas`             | `salaController.mostrarSalas`   |
| GET    | `/reservas` | Página de reservas                                       | `app.get('/reservas')`          |

---

## 🔁 Ações via Formulário

| Método | Rota                    | Descrição                            | Controlador         |
|--------|-------------------------|--------------------------------------|---------------------|
| POST   | `/`                     | Cria novo registro                   | `controller.create` |
| POST   | `/edit/:reserva_id`     | Atualiza reserva pelo ID             | `controller.update` |
| POST   | `/delete/:reserva_id`   | Remove reserva pelo ID               | `controller.delete` |

---

## 🌐 API REST — Salas

| Método | Rota                    | Descrição                            | Controlador                |
|--------|-------------------------|--------------------------------------|----------------------------|
| GET    | `/api/salas`            | Lista todas as salas                 | `salaController.getAllSala` |
| GET    | `/api/salas/:sala_id`   | Busca uma sala específica por ID     | `salaController.getSalaById` |
| POST   | `/api/salas`            | Cria uma nova sala                   | `salaController.createSala` |
| PUT    | `/api/salas/:sala_id`   | Atualiza uma sala específica         | `salaController.updateSala` |
| DELETE | `/api/salas/:sala_id`   | Remove uma sala específica           | `salaController.deleteSala` |

---

## 👥 API REST — Usuários

| Método | Rota         | Descrição                        | Controlador                   |
|--------|--------------|----------------------------------|-------------------------------|
| GET    | `/users`     | Lista todos os usuários          | `userController.getAllUsers`  |
| GET    | `/users/:id` | Retorna usuário específico por ID| `userController.getUserById`  |
| POST   | `/users`     | Cria um novo usuário             | `userController.createUser`   |
| PUT    | `/users/:id` | Atualiza um usuário              | `userController.updateUser`   |
| DELETE | `/users/:id` | Remove um usuário                | `userController.deleteUser`   |

---

## ⚙️ Configuração do Servidor (`server.js`)

- **Registro de rotas de usuários:**  
  `app.use('/users', userRoutes)`

- **Registro de rotas do front-end:**  
  `app.use('/', frontendRoutes)`

- **Middleware para rota não encontrada:**  
  ```js
  app.use((req, res, next) => {
    res.status(404).send('Página não encontrada');
  });


### 3.7 Interface e Navegação

1. Tecnologias Utilizadas

HTML5 e CSS3 para a estrutura e estilo das páginas.

JavaScript para interatividade no lado do cliente.

Frameworks ou bibliotecas utilizadas, como Bootstrap para responsividade ou EJS para renderização de templates.

2. Estrutura das Páginas

Layout comum (cabeçalho, menu de navegação).

Formulários de cadastro e edição.

Listagens de dados.

3. Funcionalidades Implementadas

Validação de formulários no lado do cliente.

Feedback visual para ações do usuário (mensagens de sucesso ou erro).

Interações dinâmicas, como modais ou menus expansíveis.

Responsividade para diferentes tamanhos de tela.

4. Integração com o Backend

Uso de EJS para renderizar páginas com dados dinâmicos.

Requisições assíncronas utilizando Fetch API ou Axios (se aplicável).

5. Capturas de Tela

![Tela de Registro](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/capturas/registro.png)

![Tela de Login](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/capturas/login.png)

![Tela de Salas](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/capturas/salas.png)

![Tela de Reserva](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/capturas/nova-reserva.png)

![Tela de Visualização das Reservas](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/capturas/minhas-reservas.png)

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web

### 4.1 Demonstração do Sistema Web

*Link para o vídeo demonstrativo:* https://drive.google.com/file/d/1kV7oatUq83AIXbJxp0N4llXPQ9qHjCsK/view?usp=sharing

 1. Estrutura da Arquitetura MVC (início do vídeo)

O vídeo inicia com a exibição da estrutura de pastas do projeto no VS Code, destacando a separação em três camadas:

Controllers/

Models/

Views/

Routes/

Essa divisão mostra claramente o uso do padrão MVC (Model-View-Controller), promovendo organização e separação de responsabilidades.

🧠 2. Abertura do authController.js (Controller)

O vídeo mostra o arquivo controllers/authController.js.

Neste controller, é possível visualizar a função responsável por criar novos registros de usuários. Essa função:

Recebe os dados do formulário (nome, email, senha, etc.).

Faz validações básicas (ex: checagem de campos).

Chama o Model para salvar os dados no banco.

Retorna uma resposta (renderizando uma view ou redirecionando).

Mensagem na tela sugerida:

“Controlador responsável pela lógica do cadastro de usuários. Ele recebe os dados do formulário e os envia ao banco.”

📦 3. Abertura do registro.js em Models (Model)

Em seguida, o vídeo exibe o arquivo models/registro.js.

Este model representa a estrutura dos dados de usuário que serão armazenados no banco de dados PostgreSQL. Ele define campos como:

nome

email

senha

Mensagem na tela sugerida:

“Model do usuário, responsável por mapear os dados no banco. Ele define os campos e sua estrutura.”

🌐 4. Abertura do registro.js em Routes (Rota)

Depois, o vídeo mostra routes/registro.js.

Este arquivo define a rota para acesso ao cadastro, normalmente com algo como:

router.get('/registro', controller.exibirFormulario);

router.post('/registro', controller.processarCadastro);

Ele conecta os endpoints às funções declaradas no authController.

Mensagem na tela sugerida:

“Arquivo de rotas que define os caminhos para exibir o formulário de cadastro e processar os dados enviados.”

🖼️ 5. Abertura do registro.ejs (View)

Por fim, o vídeo abre views/registro.ejs.

Este é o arquivo da view responsável por renderizar o formulário de cadastro de usuário. O formulário contém os campos:

Nome

Email

Senha

Confirmação de senha (se houver)

E possui um botão de envio (submit) que dispara a requisição POST para o back-end.

Mensagem na tela sugerida:

“View EJS que renderiza o formulário de cadastro. Ela se comunica com o controller através da rota configurada.”

✅ 6. Fluxo Geral (visualmente demonstrado ao longo do vídeo)

O vídeo deixa clara a comunicação entre as camadas:

O usuário acessa /registro → rota GET

O formulário é exibido → view EJS

O usuário preenche os dados e envia → rota POST

O controller processa os dados e interage com o model → salva no banco

O sistema retorna uma resposta visual (como redirecionamento ou renderização de mensagem)

---

### 4.2 Conclusões e Trabalhos Futuros

4.2 Funcionalidades do Sistema
O sistema RoomBooking foi desenvolvido com foco em atender instituições educacionais que necessitam de controle sobre reservas de salas. Abaixo estão listadas as principais funcionalidades implementadas e previstas para desenvolvimento.

✅ Funcionalidades Atuais
Autenticação de Usuário:
Login seguro via interface web, com redirecionamento para a tela de reservas após autenticação.

Cadastro e Edição de Reservas:
Usuários autenticados podem cadastrar reservas com data, horário e sala, além de editar reservas existentes (desde que não entrem em conflito com outras).

Visualização de Reservas:
Interface permite visualizar todas as reservas em uma tabela com horários, datas e responsáveis.

Validação de Conflitos:
Impede reservas duplicadas em mesma sala, data e horário.

Remoção de Reservas:
Usuários podem excluir suas próprias reservas de forma simples pela interface.

🔄 Funcionalidades Futuras (Planejadas)
Transferência de Reserva:
Permitir que um usuário transfira uma reserva existente para outro usuário autorizado, mantendo o controle e histórico da ação.

Perfil e Interface de Administrador:
Implementar uma interface dedicada para administradores, com permissões ampliadas para gestão de usuários, salas e reservas.

Cancelamento de Reservas pelo Administrador:
Adicionar a capacidade de o administrador cancelar qualquer reserva, inclusive em nome de outros usuários, com motivos documentados.



## <a name="c5"></a>5. Referências

Documentações oficiais:

https://expressjs.com/

https://nodejs.org/

https://www.postgresql.org/docs/

---


