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