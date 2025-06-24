from extensions import db
from db_model import Avaliacao, Usuario
from controllers.review_controller import AvaliacaoController
from flask import current_app

import jwt

class AvaliacaoService:
    @staticmethod
    def adicionar_avaliacao(id_usuario, comentario, avaliacao_estrelas, id_receita):
        try:
            avaliacao = Avaliacao(estrela_avaliacao=avaliacao_estrelas, comentario_avaliacao=comentario, id_usuario=id_usuario, id_receita=id_receita)
            controlador = AvaliacaoController(avaliacao)

            controlador.adicionar_avaliacao();
            
            return {"mensagem": "Avaliação adicionada com sucesso"}, 201
        except Exception as e:
            return {"erro": str(e)}, 500

    @staticmethod
    def listar_avaliacoes(id_receita):
        try:
            avaliacoes_data = db.session.query(Avaliacao).\
            join(Usuario, Avaliacao.id_usuario == Usuario.id_usuario).\
            filter(Avaliacao.id_receita == id_receita).all()

            avaliacoes = [
                {
                    "id_avaliacao": avaliacao.id_avaliacao,
                    "estrela_avaliacao": avaliacao.estrela_avaliacao,
                    "comentario_avaliacao": avaliacao.comentario_avaliacao,
                    "nome_usuario": avaliacao.usuario.nome_usuario
                }
                for avaliacao in avaliacoes_data
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