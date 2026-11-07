-- Views, functions, triggers e procedures do banco (origem: Docs/db/Querries.sql)
-- Adaptados ao schema da API: id_receitas -> id_receita; dificuldade é texto (sem tabela dificuldade).
-- Roda depois do seed, então as triggers não registram os dados iniciais.

USE db_panela_velha;
SET NAMES utf8mb4;  -- o cliente do entrypoint usa latin1 por padrão; sem isso os acentos dos scripts são gravados errados

-- VIEWS

    -- nome do usuario, quantidade de receitas e total de favoritos recebidos
    CREATE OR REPLACE VIEW vw_mostra_user AS
    SELECT u.nome_usuario,
           COUNT(DISTINCT r.id_receita) AS `qtd de receitas`,
           COUNT(f.id_receita)          AS `nmr de favoritos`
    FROM usuarios u
    LEFT JOIN receitas r  ON u.id_usuario = r.id_usuario
    LEFT JOIN favoritos f ON f.id_receita = r.id_receita
    GROUP BY u.id_usuario, u.nome_usuario;

    -- avaliações com mais de 3 estrelas
    CREATE OR REPLACE VIEW vw_avaliacoes_positivas AS
    SELECT u.nome_usuario, r.nome_receita, a.estrela_avaliacao, a.comentario_avaliacao, r.imagem_receita
    FROM avaliacao a
    INNER JOIN receitas r ON r.id_receita = a.id_receita
    INNER JOIN usuarios u ON u.id_usuario = a.id_usuario
    WHERE a.estrela_avaliacao > 3
    ORDER BY a.estrela_avaliacao DESC;

    -- receitas ordenadas por grau de dificuldade
    CREATE OR REPLACE VIEW vw_receitas_por_dificuldade AS
    SELECT r.nome_receita, r.dificuldade
    FROM receitas r
    ORDER BY FIELD(r.dificuldade, 'Muito Fácil', 'Fácil', 'Médio', 'Difícil', 'Muito Difícil');

    -- receitas por categoria
    CREATE OR REPLACE VIEW vw_receitas_categorias AS
    SELECT r.id_receita, r.nome_receita, c.nome_categoria
    FROM receitas r
    INNER JOIN receita_categoria rc ON r.id_receita = rc.id_receita
    INNER JOIN categoria c          ON c.id_categoria = rc.id_categoria;

-- FUNCTIONS (criadas antes das triggers que as usam)

DELIMITER $$

    -- quantidade de receitas de um usuario
    CREATE FUNCTION get_total_receitas_usuario(p_id_usuario INT)
    RETURNS INT
    READS SQL DATA
    BEGIN
      DECLARE total INT;
      SELECT COUNT(*) INTO total FROM receitas WHERE id_usuario = p_id_usuario;
      RETURN total;
    END$$

    -- média das avaliações de uma receita (chamada pelas triggers de avaliacao)
    CREATE FUNCTION get_media_avaliacoes_receita(p_id_receita INT)
    RETURNS DECIMAL(3,2)
    READS SQL DATA
    BEGIN
      DECLARE media DECIMAL(3,2);
      SELECT AVG(estrela_avaliacao) INTO media FROM avaliacao WHERE id_receita = p_id_receita;
      RETURN IFNULL(media, 0);
    END$$

-- TRIGGERS

    -- histórico de receitas criadas, alteradas e deletadas
    CREATE TRIGGER trg_receita_insert AFTER INSERT ON receitas
    FOR EACH ROW
    BEGIN
      INSERT INTO historico_receitas (id_receita, nome_receita, acao)
      VALUES (NEW.id_receita, NEW.nome_receita, 'INSERT');
    END$$

    CREATE TRIGGER trg_receita_update AFTER UPDATE ON receitas
    FOR EACH ROW
    BEGIN
      INSERT INTO historico_receitas (id_receita, nome_receita, acao)
      VALUES (NEW.id_receita, NEW.nome_receita, 'UPDATE');
    END$$

    CREATE TRIGGER trg_receita_delete AFTER DELETE ON receitas
    FOR EACH ROW
    BEGIN
      INSERT INTO historico_receitas (id_receita, nome_receita, acao)
      VALUES (OLD.id_receita, OLD.nome_receita, 'DELETE');
    END$$

    -- relatório de favoritamento
    CREATE TRIGGER trg_favorito_insert AFTER INSERT ON favoritos
    FOR EACH ROW
    BEGIN
      INSERT INTO relatorio_favoritos (id_receita, id_usuario, acao)
      VALUES (NEW.id_receita, NEW.id_usuario, 'FAVORITOU');
    END$$

    CREATE TRIGGER trg_favorito_delete AFTER DELETE ON favoritos
    FOR EACH ROW
    BEGIN
      INSERT INTO relatorio_favoritos (id_receita, id_usuario, acao)
      VALUES (OLD.id_receita, OLD.id_usuario, 'REMOVEU');
    END$$

    -- histórico de categorias criadas, alteradas e deletadas
    CREATE TRIGGER trg_categoria_insert AFTER INSERT ON categoria
    FOR EACH ROW
    BEGIN
      INSERT INTO historico_categorias (id_categoria, nome_categoria, acao)
      VALUES (NEW.id_categoria, NEW.nome_categoria, 'INSERT');
    END$$

    CREATE TRIGGER trg_categoria_update AFTER UPDATE ON categoria
    FOR EACH ROW
    BEGIN
      INSERT INTO historico_categorias (id_categoria, nome_categoria, acao)
      VALUES (NEW.id_categoria, NEW.nome_categoria, 'UPDATE');
    END$$

    CREATE TRIGGER trg_categoria_delete AFTER DELETE ON categoria
    FOR EACH ROW
    BEGIN
      INSERT INTO historico_categorias (id_categoria, nome_categoria, acao)
      VALUES (OLD.id_categoria, OLD.nome_categoria, 'DELETE');
    END$$

    -- recalculam a média das avaliações da receita
    CREATE TRIGGER trg_avaliacao_insert AFTER INSERT ON avaliacao
    FOR EACH ROW
    BEGIN
      INSERT INTO media_receitas (id_receita, media)
      VALUES (NEW.id_receita, get_media_avaliacoes_receita(NEW.id_receita))
      ON DUPLICATE KEY UPDATE media = get_media_avaliacoes_receita(NEW.id_receita);
    END$$

    CREATE TRIGGER trg_avaliacao_update AFTER UPDATE ON avaliacao
    FOR EACH ROW
    BEGIN
      INSERT INTO media_receitas (id_receita, media)
      VALUES (NEW.id_receita, get_media_avaliacoes_receita(NEW.id_receita))
      ON DUPLICATE KEY UPDATE media = get_media_avaliacoes_receita(NEW.id_receita);
    END$$

    CREATE TRIGGER trg_avaliacao_delete AFTER DELETE ON avaliacao
    FOR EACH ROW
    BEGIN
      UPDATE media_receitas
      SET media = get_media_avaliacoes_receita(OLD.id_receita)
      WHERE id_receita = OLD.id_receita;
    END$$

-- PROCEDURES

    -- trocar senha de um usuario
    CREATE PROCEDURE trocar_senha (IN p_id_usuario INT, IN p_nova_senha VARCHAR(255))
    BEGIN
      UPDATE usuarios SET senha_usuario = p_nova_senha WHERE id_usuario = p_id_usuario;
    END$$

    -- todas as receitas de um usuario
    CREATE PROCEDURE receitas_usuario (IN p_id_usuario INT)
    BEGIN
      SELECT * FROM receitas WHERE id_usuario = p_id_usuario;
    END$$

    -- inserir uma receita
    CREATE PROCEDURE inserir_receita (
      IN p_nome_receita VARCHAR(55), IN p_imagem_receita VARCHAR(255), IN p_ingredientes TEXT,
      IN p_passos_receita TEXT, IN p_num_porcao INT, IN p_tipo_porcao VARCHAR(45),
      IN p_dificuldade VARCHAR(45), IN p_tempo_hora INT, IN p_tempo_min INT,
      IN p_desc TEXT, IN p_id_usuario INT)
    BEGIN
      INSERT INTO receitas (nome_receita, imagem_receita, ingredientes, passos_receita, num_porcao,
                            tipo_porcao, dificuldade, tempo_hora, tempo_min, `desc`, id_usuario)
      VALUES (p_nome_receita, p_imagem_receita, p_ingredientes, p_passos_receita, p_num_porcao,
              p_tipo_porcao, p_dificuldade, p_tempo_hora, p_tempo_min, p_desc, p_id_usuario);
    END$$

    -- todas as receitas de uma categoria
    CREATE PROCEDURE receitas_por_categoria (IN p_id_categoria INT)
    BEGIN
      SELECT r.*
      FROM receitas r
      INNER JOIN receita_categoria rc ON r.id_receita = rc.id_receita
      WHERE rc.id_categoria = p_id_categoria;
    END$$

DELIMITER ;

-- médias das avaliações que vieram no seed (inseridas antes das triggers existirem)
INSERT INTO media_receitas (id_receita, media)
SELECT id_receita, AVG(estrela_avaliacao) FROM avaliacao GROUP BY id_receita;
