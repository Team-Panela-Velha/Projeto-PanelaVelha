from db_model import Receita, Favorito, Avaliacao, Categoria
from controllers.recipe_controller import RecipeController
from extensions import db
from sqlalchemy import func
from flask import jsonify
import json

class RecipeService:
    @staticmethod
    def mostrar_receitas():
        receitas = Receita.query.with_entities(
            Receita.id_receitas, Receita.nome_receita, Receita.imagem_receita
        ).all()
        return {
            "receitas": [
                {
                    "id_receitas": r.id_receitas,
                    "nome_receita": r.nome_receita,
                    "imagem_receita": r.imagem_receita
                }
                for r in receitas
            ]
        }, 200

    @staticmethod
    def mostrar_receitas_populares():
        # Exemplo: receitas com mais favoritos
        receitas = (
            db.session.query(
                Receita.id_receitas,
                Receita.nome_receita,
                Receita.imagem_receita,
                func.count(Favorito.id_usuario).label("total_favoritos")
            )
            .outerjoin(Favorito, Receita.id_receitas == Favorito.id_receita)
            .group_by(Receita.id_receitas)
            .order_by(func.count(Favorito.id_usuario).desc())
            .limit(10)
            .all()
        )
        return {
            "receitas": [
                {
                    "id_receitas": r.id_receitas,
                    "nome_receita": r.nome_receita,
                    "imagem_receita": r.imagem_receita,
                    "total_favoritos": r.total_favoritos
                }
                for r in receitas
            ]
        }, 200

    @staticmethod
    def mostrar_receitas_mais():
        # Exemplo: receitas com mais avaliações positivas (estrela > 3)
        receitas = (
            db.session.query(
                Receita.id_receitas,
                Receita.nome_receita,
                Receita.imagem_receita,
                func.count(Avaliacao.id_avaliacao).label("avaliacoes_positivas")
            )
            .outerjoin(Avaliacao, (Receita.id_receitas == Avaliacao.id_receita) & (Avaliacao.estrela_avaliacao > 3))
            .group_by(Receita.id_receitas)
            .order_by(func.count(Avaliacao.id_avaliacao).desc())
            .limit(10)
            .all()
        )
        return {
            "receitas": [
                {
                    "id_receitas": r.id_receitas,
                    "nome_receita": r.nome_receita,
                    "imagem_receita": r.imagem_receita,
                    "avaliacoes_positivas": r.avaliacoes_positivas
                }
                for r in receitas
            ]
        }, 200

   

    @staticmethod
    def categorias():
        categorias = db.session.query(Categoria.id_categoria, Categoria.nome_categoria, Categoria.imagem_categoria).all()
        return {
            "categorias": [
                {
                    "id_categoria": c.id_categoria,
                    "nome_categoria": c.nome_categoria,
                    "imagem_categoria": c.imagem_categoria
                }
                for c in categorias
            ]
        }, 200
    


    @staticmethod
    def postar_receita(dados):
        try:
            receita = Receita(
                nome_receita=dados.get("nome_receita"),
                imagem_receita=dados.get("imagem_receita"),
                ingredientes=json.dumps(dados.get("ingredientes", [])),
                passos_receita= json.dumps(dados.get("passos_receita", [])),
                num_porcao=int(dados.get("num_porcao")),
                tipo_porcao=dados.get("tipo_porcao"),
                id_dificuldade=dados.get("id_dificuldade"),
                tempo_hora=int(dados.get("tempo_hora")),
                tempo_min=int(dados.get("tempo_min")),
                desc=dados.get("desc"),
                id_usuario=dados.get("id_usuario"),
                id_categoria=json.dumps(dados.get("categoria", []))
            )

            controlador = RecipeController(receita)

            id_receita = controlador.postar_receita()
            controlador.inserir_categoria(id_receita)
            return {"mensagem": "Receita cadastrada com sucesso!"}, 201
        except Exception as e:
            return {"erro": str(e)}, 500