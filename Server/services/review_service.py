from extensions import db
from flask import current_app
import jwt

class AvaliacaoService:
    @staticmethod
    def adicionar_avaliacao(data):
        try:
            db.query(
                "INSERT INTO avaliacoes (estrela_avaliacao, comentario_avaliacao, id_usuario, id_receita) VALUES (?, ?, ?, ?)",
                (
                    data["estrela_avaliacao"],
                    data["comentario_avaliacao"],
                    data["id_usuario"],
                    data["id_receita"]
                )
            )
            return {"mensagem": "Avaliação adicionada com sucesso"}, 201
        except Exception as e:
            return {"erro": str(e)}, 500

    @staticmethod
    def listar_avaliacoes(id_receita):
        try:
            rows = db.consulta_all(
                "SELECT a.id_avaliacao, a.estrela_avaliacao, a.comentario_avaliacao, a.data_hora, a.id_usuario, u.nome FROM avaliacoes a JOIN usuarios u ON a.id_usuario = u.id WHERE a.id_receita = ? ORDER BY a.data_hora DESC",
                (id_receita,)
            )
            avaliacoes = [
                {
                    "id_avaliacao": row[0],
                    "estrela_avaliacao": row[1],
                    "comentario_avaliacao": row[2],
                    "data_hora": row[3],
                    "id_usuario": row[4],
                    "nome_usuario": row[5],
                    "id_receita": id_receita
                }
                for row in rows
            ]
            return {"avaliacoes": avaliacoes}, 200
        except Exception as e:
            return {"erro": str(e)}, 500

    @staticmethod
    def editar_avaliacao(id_avaliacao, estrela_avaliacao, comentario_avaliacao, token):
        try:
            if not token:
                return {"erro": "Token ausente"}, 401
            decoded = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
            id_usuario = decoded["usuario_id"]

            # Verifica se a avaliação pertence ao usuário
            row = db.consulta_one(
                "SELECT id_usuario FROM avaliacoes WHERE id_avaliacao = ?",
                (id_avaliacao,)
            )
            if not row or row[0] != id_usuario:
                return {"erro": "Você não tem permissão para editar esta avaliação"}, 403

            db.query(
                "UPDATE avaliacoes SET estrela_avaliacao = ?, comentario_avaliacao = ? WHERE id_avaliacao = ?",
                (estrela_avaliacao, comentario_avaliacao, id_avaliacao)
            )
            return {"mensagem": "Avaliação editada com sucesso"}, 200
        except jwt.ExpiredSignatureError:
            return {"erro": "Token expirado"}, 401
        except jwt.InvalidTokenError:
            return {"erro": "Token inválido"}, 401
        except Exception as e:
            return {"erro": str(e)}, 500

    @staticmethod
    def excluir_avaliacao(id_avaliacao, token):
        try:
            if not token:
                return {"erro": "Token ausente"}, 401
            decoded = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
            id_usuario = decoded["usuario_id"]

            # Verifica se a avaliação pertence ao usuário
            row = db.consulta_one(
                "SELECT id_usuario FROM avaliacoes WHERE id_avaliacao = ?",
                (id_avaliacao,)
            )
            if not row or row[0] != id_usuario:
                return {"erro": "Você não tem permissão para excluir esta avaliação"}, 403

            db.query(
                "DELETE FROM avaliacoes WHERE id_avaliacao = ?",
                (id_avaliacao,)
            )
            return {"mensagem": "Avaliação excluída com sucesso"}, 200
        except jwt.ExpiredSignatureError:
            return {"erro": "Token expirado"}, 401
        except jwt.InvalidTokenError:
            return {"erro": "Token inválido"}, 401
        except Exception as e:
            return {"erro": str(e)}, 500

    @staticmethod
    def media_avaliacoes(id_receita):
        try:
            row = db.consulta_one(
                "SELECT AVG(estrela_avaliacao) FROM avaliacoes WHERE id_receita = ?",
                (id_receita,)
            )
            media = float(row[0]) if row and row[0] is not None else 0.0
            return {"media": media}, 200
        except Exception as e:
            return {"erro": str(e)}, 500