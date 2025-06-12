from extensions import db
import json
from models.category_model import Categoria
from controllers.category_controller import Category_Controller

class CategoryService:
    @staticmethod
    def mostrar_categorias():
        try:
            categorias_array =  db.consulta_all("SELECT id_categoria, nome_categoria from categorias")

            categorias = [
                {"id": row[0], "nome_categoria": row[1]}
                for row in categorias_array
            ]

            return {"categorias": categorias}, 200
        except Exception as e:
            return {"erro": str(e)}, 500
    
    @staticmethod
    def pesquisar_categoria(pesquisa):
        try:
            categorias_array = db.consulta_all(
                """SELECT id_categoria, nome_categoria from categorias
                WHERE nome_categoria LIKE ? || '%' """, (pesquisa, )  # , no final para mostrar q é uma tupla. sem a virgula, ele recebe as letras separadamente
            )

            categorias = [
                {"id": row[0], "nome_categoria": row[1]}
                for row in categorias_array
            ]

            return {"categorias": categorias}, 200

        except Exception as e:
                return {"erro": str(e)}, 500
    
    # ================ serviços que precisam do controlador ======================
    
    def criar_categoria(nome_categoria):
        categoria = Categoria(nome_categoria)
        controlador = Category_Controller(categoria)

        try:
            controlador.criar_categoria()
            return {"sucesso": "Categoria criada com sucesso!"}, 201
        except Exception as e:  
            return {"erro": str(e)}, 500
        
    @staticmethod
    def editar_categoria(nome, id_categoria):
        try:
            Category_Controller.editar_categoria(nome, id_categoria)
            return {"mensagem": "Categoria atualizada com sucesso"}, 200
        except Exception as e:
            return{"erro": str(e)}, 400
    
    @staticmethod
    def excluir_categoria(id_categoria):
        try:
            Category_Controller.excluir_categoria(id_categoria)
            return {"sucesso": "Categoria excluída com sucesso"}, 200
        except Exception as e:
            return{"erro": str(e)}, 400
    