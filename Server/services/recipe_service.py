from db_model import Receita, Favorito, Avaliacao
from extensions import db
from sqlalchemy import func

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
