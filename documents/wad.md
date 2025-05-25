# Web Application Document - Projeto Individual - Módulo 2 - Inteli

**_Os trechos em itálico servem apenas como guia para o preenchimento da seção. Por esse motivo, não devem fazer parte da documentação final._**


## Room Booking - Web Project

![Logo do Projeto](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/Logo/logo.png)

#### Autor do projeto
- <a href="http://www.linkedin.com/in/christian-de-carvalho-lawrence">Christian De Carvalho Lawrence</a>

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)

O que o sistema em questão visa tornar mais fácil o agendamento e reserva de salas, em universidades por exemplo. Isso porque, existem estudantes e professores que precisam de determinada sala para uma reunião, estudo em grupo ou até mesmo uma apresentação, porém, têm dificuldades em torno disso devido à organização da mesma pois os processos de reserva de sala são desorganizados, no entanto, manual ou mal distribuídos.
Para isso, a solução proposta é o desenvolvimento de uma aplicação web simples e clara que permitiria aos usuários consultar salas em tempo real que estão disponíveis, agendar, de inserir e cancelar agendamento. Ele também fará um painel administrativo que será destinado a ser utilizado pelos responsáveis pelas salas para alimentar horários e aprovações.
Este projeto é uma forma de aplicar conhecimentos de front-end, back-end e ainda banco de dados e mesmo a criação de uma interface visualmente viável ao espectador e funcional.
 
---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01)

*Posicione aqui sua(s) Persona(s) em forma de texto markdown com imagens, ou como imagem de template preenchido. Atualize esta seção ao longo do módulo se necessário.*

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
### 3.1. Modelagem do banco de dados  (Semana 3)

*Posicione aqui os diagramas de modelos relacionais do seu banco de dados, apresentando todos os esquemas de tabelas e suas relações. Utilize texto para complementar suas explicações, se necessário.*

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
### 3.1.1 BD e Models (Semana 5)

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

### 3.2. Arquitetura (Semana 5)

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

### 3.3. Wireframes (Semana 03)

![Wireframe Completo](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/Wireframe/wireframe.png)

![Tela de Login](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/Wireframe/1.png)

![Tela de Principal](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/Wireframe/2.png)

![Tela de Reserva](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/Wireframe/3.png)

![Tela de Visualização das Reservas](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/Wireframe/4.png)

### 3.4. Guia de estilos (Semana 05)

![Mini guia de estilos](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/estilos/mini-guia-de-estilos.png)

![Guia de Estilos](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/estilos/PAF.png)



### 3.5. Protótipo de alta fidelidade (Semana 05)

![Tela de Login](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/prototipo/login.png)

![Tela Home do site](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/prototipo/home.png)

![Tela para reservar as salas](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/prototipo/reservando.png)

![Tela das reservas do usuário](https://github.com/ChristianCLawr2nc2/RoomBooking/blob/main/documents/assets/prototipo/reservas.png)

[Link de Protótipo no Figma](https://www.figma.com/design/ui33OggzNK9Z0dYD8Ws81B/PAF?node-id=0-1&p=f&t=bCsRVbXvzJZOUZ15-0)

### 3.6. WebAPI e endpoints (Semana 05)

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


### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que seu parceiro possa consultar caso ele se interessar em aprofundar. Um exemplo de referência de livro e de site:_<br>

---
---


