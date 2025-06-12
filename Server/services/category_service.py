from extensions import db
import json
from models.category_model import Categoria
from controllers.category_controller import Category_Controller

# Arquivo feito usando recipe_service.py como base

# mostrar_categorias() | Alterado para exibir todas as categorias com seus valores(id, nome, img)
# mostrar_categorias_populares() | Alterado para pegar as categorias mais usadas (não sei se está funcionando)
# mostrar_categorias_mais() | Só foi trocado "receita" por "categoria"
# mostrar_categoria_pesquisa(pesquisa) | Alterado para pesquisar categorias, retorna id, nome e img
# mostrar_receita_categoria(categoria) | Alterado para exibir os dados de categorias na tabela receita_categoria
# slider_categoria(categoria) | Não alterado (não sei para que serve)
# mostrar_categorias_listadas(id_receita) | Alterado para exibir categorias atreladas a uma receita
# categoria(id_categoria) | Alterado para exibir uma categoria pesquisada
# categorias() | Não alterado, exibe todas as categorias

# serviços que precisam do controlador
# criar_categoria(data) | Cria uma categoria
# editar_categoria(colunas, valores, id_categoria) | Edita uma categoria existente
# excluir_categoria(id_categoria) | Exclui uma categoria existente

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
    