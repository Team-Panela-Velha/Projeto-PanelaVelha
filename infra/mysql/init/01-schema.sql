-- Schema do Panela Velha, compatível com Server/db_model.py
-- Executado automaticamente pelo container MySQL na primeira inicialização (volume vazio).

SET NAMES utf8mb4;  -- o cliente do entrypoint usa latin1 por padrão; sem isso os acentos dos scripts são gravados errados

CREATE DATABASE IF NOT EXISTS db_panela_velha
    DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE db_panela_velha;

-- TABELAS DA APLICAÇÃO

CREATE TABLE usuarios (
    id_usuario      INT AUTO_INCREMENT PRIMARY KEY,
    nome_usuario    VARCHAR(50) UNIQUE,
    senha_usuario   VARCHAR(255),
    adm_usuario     TINYINT(1) DEFAULT 0 COMMENT 'bool para definir adm'
) ENGINE=InnoDB;

CREATE TABLE categoria (
    id_categoria    INT AUTO_INCREMENT PRIMARY KEY,
    nome_categoria  VARCHAR(55)
) ENGINE=InnoDB;

CREATE TABLE receitas (
    id_receita      INT AUTO_INCREMENT PRIMARY KEY,
    nome_receita    VARCHAR(55),
    imagem_receita  VARCHAR(255),
    ingredientes    TEXT,                -- lista em JSON
    passos_receita  TEXT,                -- lista em JSON
    num_porcao      INT,
    tipo_porcao     VARCHAR(45),
    dificuldade     VARCHAR(45),         -- 'Muito Fácil' | 'Fácil' | 'Médio' | 'Difícil' | 'Muito Difícil'
    tempo_hora      INT,
    tempo_min       INT,
    `desc`          TEXT,
    id_categoria    VARCHAR(255),        -- lista de ids em JSON (redundante com receita_categoria, mantido pela API)
    id_usuario      INT,
    CONSTRAINT fk_receitas_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
) ENGINE=InnoDB;

CREATE TABLE favoritos (
    id_receita      INT NOT NULL,
    id_usuario      INT NOT NULL,
    PRIMARY KEY (id_receita, id_usuario),
    CONSTRAINT fk_favoritos_receita FOREIGN KEY (id_receita) REFERENCES receitas (id_receita) ON DELETE CASCADE,
    CONSTRAINT fk_favoritos_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE receita_categoria (
    id_categoria    INT NOT NULL,
    id_receita      INT NOT NULL,
    PRIMARY KEY (id_categoria, id_receita),
    CONSTRAINT fk_receita_categoria_categoria FOREIGN KEY (id_categoria) REFERENCES categoria (id_categoria) ON DELETE CASCADE,
    CONSTRAINT fk_receita_categoria_receita FOREIGN KEY (id_receita) REFERENCES receitas (id_receita) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE avaliacao (
    id_avaliacao         INT AUTO_INCREMENT PRIMARY KEY,
    estrela_avaliacao    INT,
    comentario_avaliacao TEXT,
    data_hora            TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    id_usuario           INT,
    id_receita           INT,
    CONSTRAINT fk_avaliacao_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario) ON DELETE CASCADE,
    CONSTRAINT fk_avaliacao_receita FOREIGN KEY (id_receita) REFERENCES receitas (id_receita) ON DELETE CASCADE
) ENGINE=InnoDB;

-- TABELAS ALIMENTADAS PELAS TRIGGERS (03-objects.sql)
-- As tabelas de log não têm FK: o log de DELETE aponta para um registro que já não existe.

CREATE TABLE historico_receitas (
    id_log          INT AUTO_INCREMENT PRIMARY KEY,
    id_receita      INT NOT NULL,
    nome_receita    VARCHAR(55),
    acao            ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    data_acao       TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    KEY idx_historico_receitas_receita (id_receita)
) ENGINE=InnoDB;

CREATE TABLE historico_categorias (
    id_log          INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria    INT NOT NULL,
    nome_categoria  VARCHAR(55),
    acao            ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    data_acao       TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    KEY idx_historico_categorias_categoria (id_categoria)
) ENGINE=InnoDB;

CREATE TABLE relatorio_favoritos (
    id_log          INT AUTO_INCREMENT PRIMARY KEY,
    id_receita      INT NOT NULL,
    id_usuario      INT NOT NULL,
    acao            ENUM('FAVORITOU', 'REMOVEU') NOT NULL,
    data_acao       TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    KEY idx_relatorio_favoritos_receita (id_receita),
    KEY idx_relatorio_favoritos_usuario (id_usuario)
) ENGINE=InnoDB;

CREATE TABLE media_receitas (
    id_receita      INT PRIMARY KEY,
    media           DECIMAL(3,2) NOT NULL DEFAULT 0,
    CONSTRAINT fk_media_receitas_receita FOREIGN KEY (id_receita) REFERENCES receitas (id_receita) ON DELETE CASCADE
) ENGINE=InnoDB;
