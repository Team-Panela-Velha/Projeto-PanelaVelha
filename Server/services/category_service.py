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
        
    @staticmethod
    def mostrar_categorias_populares():
        try:
            receita_categoria = db.consulta_all("SELECT id_receita, count(*) as num_favoritos from categorias GROUP BY id_receita")
            categorias_favoritas = [str(cat[0]) for cat in categorias[0:6]]

            categorias_array = db.consulta_all(
                f"""SELECT DISTINCT c.id_categoria, c.nome_categoria, c.imagem_categoria from categorias c
                inner join receita_categoria re on c.id_categoria = rc.id_categoria
                inner join receitas r on r.id_receita = rc.id_receita
                WHERE r.id_receitas in ({', '.join(categorias_favoritas)})
                ORDER BY (SELECT count(*) from receita_categoria WHERE id_receita = r.id_receita) DESC""")  # ordenando as receitas de acordo com os favoritos

            categorias = [
                {"id": row[0], "categoria": row[1], "categoria": row[2]}
                for row in categorias_array
            ]

            return {"categorias": categorias}, 200
        except Exception as e:
            return {"erro": str(e)}, 500

    @staticmethod
    def mostrar_categorias_mais():
        try:
            categorias_array = db.consulta_many("SELECT id_categoria, nome_categoria, imagem_categoria from categorias", 6)
            categorias = [
                    {"id": row[0], "nome_categoria": row[1], "imagem_categoria": row[2]}
                    for row in categorias_array
                ]

            return {"categorias": categorias}, 200
        except Exception as e:
            return {"erro": str(e)}, 500
        
    @staticmethod
    def mostrar_categoria_pesquisa(pesquisa):
        try:
            categorias_array = db.consulta_all(
                """SELECT id_categoria, nome_categoria, imagem_categoria from categorias
                WHERE nome_categoria LIKE ? || '%' """, (pesquisa, )  # , no final para mostrar q é uma tupla. sem a virgula, ele recebe as letras separadamente
            )

            categorias = [
                {"id": row[0], "nome_categoria": row[1], "imagem_categoria": row[2]}
                for row in categorias_array
            ]

            return {"categorias": categorias}, 200
        except Exception as e:
            return {"erro": str(e)}, 500
        
    @staticmethod
    def mostrar_receita_categoria(categoria):
        try:
            categorias_array = db.consulta_all(
                """SELECT c.id_categoria, c.nome_categoria, c.imagem_categoria from categorias c
                inner join receita_categoria rc on c.id_categoria = rc.id_categoria
                inner join receitas r on rc.id_receita = r.id_receita
                WHERE c.nome_categoria = ?""", (categoria, )
            )

            categorias = [
                {"id": row[0], "nome_categoria": row[1], "imagem_categoria": row[2]}
                for row in categorias_array
            ]

            return {"categorias": categorias}, 200
        except Exception as e:
            return {"erro": str(e)}, 500
        
    @staticmethod
    def slider_categoria(categoria):
        try:
            favoritos = db.consulta_all(
                """SELECT f.id_receita, count(*) as num_favoritos from favoritos f
                inner join receitas r on f.id_receita = r.id_receita
                inner join receita_categoria rc on r.id_receita = rc.id_receita
                inner join categorias c on rc.id_categoria = c.id_categoria
                WHERE c.nome_categoria = ?
                GROUP BY f.id_receita""", (categoria, ))
        
            receitas_favoritas = [str(fav[0]) for fav in favoritos[0:4]]

            receitas_array = db.consulta_all(
                f"""SELECT DISTINCT r.id_receita, r.nome_receita, r.imagem_receita from receitas r
                    inner join favoritos f on r.id_receita = f.id_receita
                    inner join receita_categoria rc on r.id_receita = rc.id_receita
                    inner join categorias c on rc.id_categoria = c.id_categoria
                    WHERE r.id_receita in ({', '.join(receitas_favoritas)}) and c.nome_categoria = ?
                    ORDER BY (SELECT count(*) from favoritos WHERE id_receita = r.id_receita) DESC""", (categoria, ))
                    
            receitas = [
                    {"id_receita": row[0], "nome_receita": row[1], "imagem_receita": row[2]}
                    for row in receitas_array
                ]

            return {"receitas": receitas}, 200
        except Exception as e:
            return {"erro": str(e)}, 500
        
    @staticmethod
    def mostrar_categorias_listadas(id_receita):
        try: 
            categorias_array = db.consulta_all(
                """SELECT c.id_categoria, c.nome_categoria, c.imagem_categoria from categorias c
                inner join receita_categoria rc on c.id_categoria = rc.id_categoria
                inner join receitas r on rc.id_receita = r.id_receita
                WHERE f.id_receita = ?""", (id_receita, )
            )      # a relacao do join deve ser feita pelo id_receita, e n id_usuario, q acessa todas as receitas relacionadas ao usuario

            categorias = [
                    {"id": row[0], "nome_categoria": row[1], "imagem_categoria": row[2]}
                    for row in categorias_array
                ]

            return {"categorias": categorias}, 200
        except Exception as e:
            return {"erro": str(e)}, 500
    
    @staticmethod
    def categoria(id_categoria):
        try:
            categoria_array = db.consulta_one(
                """SELECT id_categoria, nome_categoria, imagem_categoria from categorias
                where id_categoria = ?""", (id_categoria,)
            )

            categoria = {                 # o select devolve uma lista, por isso mudar para um dict
                "id_categoria": categoria_array[0],
                "nome_categoria": categoria_array[1],
                "imagem_categoria": categoria_array[2]
            } 

            return {"categoria": categoria}, 201    
        except Exception as e:
            return {"erro": str(e)}, 500
        
        
    
    # ================ serviços que precisam do controlador ======================
    
    def criar_categoria(data):
        nome = data.get("nome_categoria")
        imagem = data.get("imagem_categoria")

        categoria = Categoria(nome, imagem)
        controlador = Category_Controller(categoria)

        try:
            id_categoria = controlador.criar_categoria()
            return {"sucesso": "Receita postada com sucesso!"}, 201
        except Exception as e:  
            return {"erro": str(e)}, 500
        
    @staticmethod
    def editar_categoria(colunas, valores, id_categoria):
        Category_Controller.editar_categoria(colunas, valores, id_categoria)
        return {"mensagem": "Categoria atualizada com sucesso"}, 200
    
    @staticmethod
    def excluir_categoria(id_categoria):
        Category_Controller.excluir_receita(id_categoria)
        return {"sucesso": "Categoria excluída com sucesso"}, 200