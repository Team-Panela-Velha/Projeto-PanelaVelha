from db_model import Receita, Usuario, Favorito, Avaliacao, Categoria, ReceitaCategoria
from controllers.recipe_controller import RecipeController
from extensions import db
from sqlalchemy import func, desc
from flask import jsonify
import json

class RecipeService:
    @staticmethod
    def mostrar_receitas():
        receitas = Receita.query.with_entities(
            Receita.id_receita, Receita.nome_receita, Receita.imagem_receita
        ).all()
        return {
            "receitas": [
                {
                    "id_receita": r.id_receita,
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
                Receita.id_receita,
                Receita.nome_receita,
                Receita.imagem_receita,
                func.count(Favorito.id_usuario).label("total_favoritos")
            )
            .outerjoin(Favorito, Receita.id_receita == Favorito.id_receita)
            .group_by(Receita.id_receita, Receita.nome_receita, Receita.imagem_receita)
            .order_by(func.count(Favorito.id_usuario).desc())
            .limit(10)
            .all()
        )
        return {
            "receitas": [
                {
                    "id_receita": r.id_receita,
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
                Receita.id_receita,
                Receita.nome_receita,
                Receita.imagem_receita,
                func.count(Avaliacao.id_avaliacao).label("avaliacoes_positivas")
            )
            .outerjoin(Avaliacao, Receita.id_receita == Avaliacao.id_receita)
            .filter((Avaliacao.estrela_avaliacao == None) | (Avaliacao.estrela_avaliacao > 3))
            .group_by(Receita.id_receita, Receita.nome_receita, Receita.imagem_receita)
            .order_by(func.count(Avaliacao.id_avaliacao).desc())
            .limit(10)
            .all()
        )
        return {
            "receitas": [
                {
                    "id_receita": r.id_receita,
                    "nome_receita": r.nome_receita,
                    "imagem_receita": r.imagem_receita,
                    "avaliacoes_positivas": r.avaliacoes_positivas
                }
                for r in receitas
            ]
        }, 200    
        
        # lucas:
        
    @staticmethod
    def mostrar_receitas_categoria(categoria): #ok
        receitas = (
            db.session.query(
                Receita.id_receita,
                Receita.nome_receita,
                Receita.imagem_receita
            )
            .join(ReceitaCategoria, Receita.id_receita == ReceitaCategoria.id_receita)
            .join(Categoria, ReceitaCategoria.id_categoria == Categoria.id_categoria)
            .filter(Categoria.nome_categoria == categoria)
            .group_by(Receita.id_receita, Receita.nome_receita, Receita.imagem_receita)
            .limit(10)
            .all()
        )

        return {
            "receitas": [
                {
                    "id_receita": r.id_receita,
                    "nome_receita": r.nome_receita,
                    "imagem_receita": r.imagem_receita
                }
                for r in receitas
            ]
        }, 200
    
    @staticmethod
    def slider_categoria(categoria):                # ok
            subq = (
                db.session.query(
                    Favorito.id_receita,
                    func.count(Favorito.id_receita).label('num_favoritos')
                )
                .join(Receita, Favorito.id_receita == Receita.id_receita)
                .join(ReceitaCategoria, Receita.id_receita == ReceitaCategoria.id_receita)
                .join(Categoria, ReceitaCategoria.id_categoria == Categoria.id_categoria)
                .filter(Categoria.nome_categoria == categoria)
                .group_by(Favorito.id_receita)
                .order_by(desc('num_favoritos'))
                .limit(10)
                .subquery()
            )

            receitas = (
                db.session.query(
                    Receita.id_receita,
                    Receita.nome_receita,
                    Receita.imagem_receita
                )
                .join(subq, Receita.id_receita == subq.c.id_receita)
                .join(ReceitaCategoria, Receita.id_receita == ReceitaCategoria.id_receita)
                .join(Categoria, ReceitaCategoria.id_categoria == Categoria.id_categoria)
                .filter(Categoria.nome_categoria == categoria)
                .order_by(desc(subq.c.num_favoritos))
                .all()
            )

            resultado = [
                {
                    "id_receita": rec.id_receita,
                    "nome_receita": rec.nome_receita,
                    "imagem_receita": rec.imagem_receita
                }
                for rec in receitas
            ]

            return {"receitas": resultado}, 200

    @staticmethod
    def mostrar_receitas_usuario(usuario):          # ok
        receitas = (
            db.session.query(
                Receita.id_receita,
                Receita.nome_receita,
                Receita.imagem_receita
            )
            .join(Usuario, (Receita.id_usuario == Usuario.id_usuario))
            .where(Usuario.id_usuario == usuario)
            .limit(10)
            .all()
        )

        return {
            "receitas": [
                {
                    "id_receita": r.id_receita,
                    "nome_receita": r.nome_receita,
                    "imagem_receita": r.imagem_receita
                }
                for r in receitas
            ]
        }, 200
    
    @staticmethod
    def mostrar_receitas_favoritas(usuario):        # Testar
        receitas = (
            db.session.query(
                Receita.id_receita,
                Receita.nome_receita,
                Receita.imagem_receita
            )
            .join(Favorito, Receita.id_receita == Favorito.id_receita)
            .filter(Favorito.id_usuario == usuario)
            .limit(10)
            .all()
        )

        return {
            "receitas": [
                {
                    "id_receita": r.id_receita,
                    "nome_receita": r.nome_receita,
                    "imagem_receita": r.imagem_receita
                }
                for r in receitas
            ]
        }, 200

    @staticmethod
    def receita(id_receita):                          # OK
        try:
            receita_data = db.session.query(Receita).filter_by(id_receita=id_receita).first()

            categoria_data = db.session.query(Categoria).\
            join(ReceitaCategoria, Categoria.id_categoria == ReceitaCategoria.id_categoria).\
            filter(ReceitaCategoria.id_receita == id_receita).all()
            
            categorias = [
                {"id_categoria": categoria.id_categoria, "nome_categoria": categoria.nome_categoria}
                for categoria in categoria_data
            ]

            receita = {
                "id_receita": receita_data.id_receita,
                "nome_receita": receita_data.nome_receita,
                "imagem_receita": receita_data.imagem_receita,
                "ingredientes": receita_data.ingredientes,
                "passos_receita": receita_data.passos_receita,
                "num_porcao": receita_data.num_porcao,
                "tipo_porcao": receita_data.tipo_porcao,
                "dificuldade": receita_data.dificuldade,
                "tempo_hora": receita_data.tempo_hora,
                "tempo_min": receita_data.tempo_min,
                "desc": receita_data.desc,
                "id_categoria": categorias,
                "id_usuario": receita_data.id_usuario
            }

            return {"receita": receita}, 200
        except Exception as e:
            print(f"Erro ao buscar receita: {e}")
            return {"erro": e}, 500
        
# --------------------------------------------------------

    @staticmethod
    def categorias():                          # OK
        categorias = db.session.query(Categoria.id_categoria, Categoria.nome_categoria).all()
        return {
            "categorias": [
                {
                    "id_categoria": c.id_categoria,
                    "nome_categoria": c.nome_categoria,
                }
                for c in categorias
            ]
        }, 200
    
# ------------------------------------------------------------

    @staticmethod
    def postar_receita(dados):                     # OK
        try:
            receita = Receita(
                nome_receita=dados.get("nome_receita"),
                imagem_receita=dados.get("imagem_receita"),
                ingredientes=json.dumps(dados.get("ingredientes", [])),
                passos_receita= json.dumps(dados.get("passos_receita", [])),
                num_porcao=int(dados.get("num_porcao")),
                tipo_porcao=dados.get("tipo_porcao"),
                dificuldade=dados.get("dificuldade"),
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
        
    @staticmethod 
    def editar_receita(id_receita, valores):                         # OK
        try:
            RecipeController.editar_receita(valores, id_receita)
            return {"mensagem": "Receita atualizada com sucesso"}, 201
        except Exception as e:
            return {"erro": str(e)}, 500
        
    @staticmethod
    def editar_categoria(id_receita, categoria):                  # OK
        try:
            RecipeController.editar_categoria(id_receita, categoria)
            return {"mensagem": "Categoria atualizada"}, 200
        except Exception as e:
            return{"erro": str(e)}, 500