# Web Application Document - Projeto Individual - Módulo 2 - Inteli

**_Os trechos em itálico servem apenas como guia para o preenchimento da seção. Por esse motivo, não devem fazer parte da documentação final._**


## Room Booking - Web Project

![Logo do Projeto](https://github.com/ChristianCLawr2nc2/Projeto-Individual---M2/blob/main/document/assets/Logo/logo.png)

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

![Persona - Amanda Costa](https://github.com/ChristianCLawr2nc2/Projeto-Individual---M2/blob/main/document/assets/persona/persona-pi.png)


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

![Diagrama de tabelas do banco de dados](https://github.com/ChristianCLawr2nc2/Projeto-Individual---M2/blob/main/document/assets/modelo-banco/modelo-banco.png)

**Modelo Físico do Banco de Dados**
````sql
Table usuario {
  id int [pk, increment]
  nome varchar(100) [not null]
  email varchar(100) [not null]
  tipo enum('adiministrador', 'coordenação', 'aluno') [not null]
}

Table sala {
  sala_id int [pk, increment]
  numero varchar(50) [not null, unique]
  capacidade varchar(10) [not null]
  andar number [not null]
  disponivel boolean [default: true]
}

Table reserva {
  reserva_id int [pk, increment]
  usuario_id int [not null]
  sala_id int [not null]
  status enum('pendente','reservado', 'cancelado') [default: 'pendente']
  dia_uso date [not null]
  data_solicitacao timestamp [default: `now()`]
  tempo time [not null]
}

table dia {
  segunda_feira day
  terça_feira day
  quarta_feira day
  quinta_feira day
  sexta_feira day
}

Ref: reserva.usuario_id > usuario.id
Ref: reserva.sala_id > sala.sala_id
Ref: dia.segunda_feira > reserva.dia_uso
Ref: dia.terça_feira > reserva.dia_uso
Ref: dia.quarta_feira > reserva.dia_uso
Ref: dia.quinta_feira > reserva.dia_uso
Ref: dia.sexta_feira > reserva.dia_uso
````
---
### 3.1.1 BD e Models (Semana 5)
*Descreva aqui os Models implementados no sistema web*

### 3.2. Arquitetura (Semana 5)

*Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário.*

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
  
*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes (Semana 03)

![Wireframe Completo](https://github.com/ChristianCLawr2nc2/Projeto-Individual---M2/blob/main/document/assets/Wireframe/wireframe.png)

![Tela de Login](https://github.com/ChristianCLawr2nc2/Projeto-Individual---M2/blob/main/document/assets/Wireframe/1.png)

![Tela de Principal](https://github.com/ChristianCLawr2nc2/Projeto-Individual---M2/blob/main/document/assets/Wireframe/2.png)

![Tela de Reserva](https://github.com/ChristianCLawr2nc2/Projeto-Individual---M2/blob/main/document/assets/Wireframe/3.png)

![Tela de Visualização das Reservas](https://github.com/ChristianCLawr2nc2/Projeto-Individual---M2/blob/main/document/assets/Wireframe/4.png)

### 3.4. Guia de estilos (Semana 05)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.*  

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


