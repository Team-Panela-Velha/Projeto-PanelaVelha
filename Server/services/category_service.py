from extensions import db
import json
from db_model import Categoria
from controllers.category_controller import Category_Controller

class CategoryService:
    @staticmethod
    def mostrar_categorias():
        try:
            categorias_data = db.session.query(Categoria).all()

            categorias = [
                {"id": cat.id_categoria, "nome_categoria": cat.nome_categoria}
                for cat in categorias_data
            ]

            return {"categorias": categorias}, 200
        except Exception as e:
            return {"erro": str(e)}, 500
    
    @staticmethod
    def pesquisar_categoria(pesquisa):                            # OK
        try:
            categorias_data = db.session.query(Categoria).\
            filter(Categoria.nome_categoria.like(f"{pesquisa}%")).all()

            categorias = [
                {"id": cat.id_categoria, "nome_categoria": cat.nome_categoria}
                for cat in categorias_data
            ]

            return {"categorias": categorias}, 200

        except Exception as e:
                return {"erro": str(e)}, 500
    
    # ================ serviços que precisam do controlador ======================
    
    def criar_categoria(nome_categoria):                                  # OK
        categoria = Categoria(nome_categoria=nome_categoria)
        controlador = Category_Controller(categoria)

        try:
            controlador.criar_categoria()
            return {"sucesso": "Categoria criada com sucesso!"}, 201
        except Exception as e:  
            return {"erro": str(e)}, 500
        
    @staticmethod
    def editar_categoria(nome, id_categoria):                            # OK
        try:
            Category_Controller.editar_categoria(nome, id_categoria)
            return {"mensagem": "Categoria atualizada com sucesso"}, 200
        except Exception as e:
            return{"erro": str(e)}, 400
    
    @staticmethod
    def excluir_categoria(id_categoria):                        # OK
        try:
            Category_Controller.excluir_categoria(id_categoria)
            return {"sucesso": "Categoria excluída com sucesso"}, 200
        except Exception as e:
            return{"erro": str(e)}, 400
    