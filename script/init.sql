CREATE TABLE IF NOT EXISTS usuario (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(255) NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_usuario_email ON usuario(email);

CREATE TABLE IF NOT EXISTS sala (
  sala_id SERIAL PRIMARY KEY,
  numero VARCHAR(10) NOT NULL UNIQUE,
  andar VARCHAR(10) NOT NULL,
  disponivel BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS reserva (
  reserva_id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL,
  sala_id INTEGER NOT NULL,
  dia DATE NOT NULL,
  horario TIME NOT NULL,
  duracao INTERVAL NOT NULL,
  FOREIGN KEY (sala_id) REFERENCES sala(sala_id),
  FOREIGN KEY (usuario_id) REFERENCES usuario(id),
  UNIQUE(sala_id, dia, horario)
);

INSERT INTO usuario (nome, email, senha) VALUES
('Alice Silva', 'alice@empresa.com', 'senha123'),
('Bruno Lima', 'bruno@empresa.com', 'senha123'),
('Carla Souza', 'carla@empresa.com', 'senha123');

INSERT INTO sala (numero, andar, disponivel) VALUES
('R01', '1º andar', TRUE),
('R02', '1º andar', TRUE),
('R03', '2º andar', TRUE),
('R04', '2º andar', TRUE);

INSERT INTO reserva (usuario_id, sala_id, dia, duracao, horario) VALUES
(1, 1, '2025-05-25', '2 hours', '10:00'),
(2, 2, '2025-05-25', '1 hour', '11:00'),
(3, 4, '2025-05-26', '2 hours', '12:00');

SELECT
  u.nome AS nome_usuario,
  s.numero AS numero_sala,
  s.andar,
  r.dia,
  r.duracao,
  r.horario
FROM reserva r
JOIN usuario u ON r.usuario_id = u.id
JOIN sala s ON r.sala_id = s.sala_id
ORDER BY r.dia, r.duracao;