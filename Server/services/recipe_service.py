from extensions import db
import json
from models.recipe_model import Receita

class RecipeService:
    @staticmethod
    def mostrar_receitas():
        try:
            receitas_array =  db.consulta_all("SELECT id_receita, nome_receita, imagem_receita from receitas")

            receitas = [
                {"id": row[0], "nome_receita": row[1], "imagem_receita": row[2]}
                for row in receitas_array
            ]

            return {"receitas": receitas}, 200
        except Exception as e:
            return {"erro": str(e)}, 500
        
    @staticmethod
    def mostrar_receitas_populares():
        try:
            favoritos = db.consulta_all("SELECT id_receita, count(*) as num_favoritos from favoritos GROUP BY id_receita")
            receitas_favoritas = [str(fav[0]) for fav in favoritos[0:6]]

            receitas_array = db.consulta_all(
                f"""SELECT DISTINCT r.id_receita, r.nome_receita, r.imagem_receita from receitas r
                inner join favoritos f on r.id_receita = f.id_receita
                WHERE r.id_receita in ({', '.join(receitas_favoritas)})
                ORDER BY (SELECT count(*) from favoritos WHERE id_receita = r.id_receita) DESC""")  # ordenando as receitas de acordo com os favoritos

            receitas = [
                {"id": row[0], "nome_receita": row[1], "imagem_receita": row[2]}
                for row in receitas_array
            ]

            return {"receitas": receitas}, 200
        except Exception as e:
            return {"erro": str(e)}, 500

    @staticmethod
    def mostrar_receitas_mais():
        try:
            receitas_array = db.consulta_many("SELECT id_receita, nome_receita, imagem_receita from receitas", 6)
            receitas = [
                    {"id": row[0], "nome_receita": row[1], "imagem_receita": row[2]}
                    for row in receitas_array
                ]

            return {"receitas": receitas}, 200
        except Exception as e:
            return {"erro": str(e)}, 500
        
    @staticmethod
    def mostrar_receita_pesquisa(pesquisa):
        try:
            receitas_array = db.consulta_all(
                """SELECT id_receita, nome_receita, imagem_receita from receitas
                WHERE nome_receita LIKE ? || '%' """, (pesquisa, )  # , no final para mostrar q é uma tupla. sem a virgula, ele recebe as letras separadamente
            )

            receitas = [
                {"id": row[0], "nome_receita": row[1], "imagem_receita": row[2]}
                for row in receitas_array
            ]

            return {"receitas": receitas}, 200
        except Exception as e:
            return {"erro": str(e)}, 500
        
    @staticmethod
    def mostrar_receitas_categoria(categoria):
        try:
            receitas_array = db.consulta_all(
                """SELECT r.id_receita, r.nome_receita, r.imagem_receita from receitas r
                inner join receita_categoria rc on r.id_receita = rc.id_receita
                inner join categorias c on rc.id_categoria = c.id_categoria
                WHERE c.nome_categoria = ?""", (categoria, )
            )

            receitas = [
                {"id": row[0], "nome_receita": row[1], "imagem_receita": row[2]}
                for row in receitas_array
            ]

            return {"receitas": receitas}, 200
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
    def mostrar_receitas_usuario(id_usuario):
        try:
            receitas_array = db.consulta_all(
                """SELECT r.id_receita, r.nome_receita, r.imagem_receita from receitas r
                inner join usuarios u on r.id_usuario = u.id
                WHERE u.id = ?""", (id_usuario)
            )

            receitas = [
                {"id": row[0], "nome_receita": row[1], "imagem_receita": row[2]}
                for row in receitas_array
            ]

            return {"receitas": receitas}, 200
        except Exception as e:
            return {"erro": str(e)}, 500
        
    @staticmethod
    def mostrar_receitas_favoritas(id_usuario):
        try: 
            receitas_array = db.consulta_all(
                """SELECT r.id_receita, r.nome_receita, r.imagem_receita from receitas r
                inner join favoritos f on r.id_receita = f.id_receita     
                WHERE f.id_usuario = ?""", (id_usuario, )
            )      # a relacao do join deve ser feita pelo id_receita, e n id_usuario, q acessa todas as receitas relacionadas ao usuario

            receitas = [
                    {"id": row[0], "nome_receita": row[1], "imagem_receita": row[2]}
                    for row in receitas_array
                ]

            return {"receitas": receitas}, 200
        except Exception as e:
            return {"erro": str(e)}, 500
        
    @staticmethod
    def receita(id_receita):
        try:
            receita_array = db.consulta_one(
                """SELECT r.id_receita, r.nome_receita, r.imagem_receita, r.ingredientes, r.passos_receita, r.num_porcao, r.tipo_porcao, r.dificuldade, r.tempo_min, r.tempo_hora, r.desc, u.id, u.nome from receitas r
                inner join usuarios u on r.id_usuario = u.id
                where r.id_receita = ?""", (id_receita,)
            )

            categoria_array = db.consulta_all(
                """SELECT * from categorias c
                inner join receita_categoria r on c.id_categoria = r.id_categoria
                WHERE r.id_receita = ?""", (id_receita,)
            )

            categoria = [
                {"id_categoria": row[0], "nome_categoria": row[1]}
                for row in categoria_array
            ]

            receita = {                 # o select devolve uma lista, por isso mudar para um dict
                "id_receita": receita_array[0],
                "nome_receita": receita_array[1],
                "imagem_receita": receita_array[2],
                "ingredientes": receita_array[3],
                "passos_receita": receita_array[4],
                "num_porcao": receita_array[5],
                "tipo_porcao": receita_array[6],
                "categoria": categoria,
                "dificuldade": receita_array[7],
                "tempo_min": receita_array[8],
                "tempo_hora": receita_array[9],
                "desc": receita_array[10],
                "id_usuario": receita_array[11],
                "nome_usuario": receita_array[12]
            } 

            return {"receita": receita}, 201       
        except Exception as e:
            return {"erro": str(e)}, 500
        
    @staticmethod
    def categorias():
        categorias_array = db.consulta_all("SELECT * from categorias")

        categorias = [
            {"id_categoria": row[0], "nome_categoria": row[1]}
            for row in categorias_array
        ]

        return {"categorias": categorias}, 200
    
    def postar_receita(data):
        nome = data.get("nome_receita")
        imagem = data.get("imagem_receita")
        ingredientes_receita = data.get("ingredientes")
        passos_receita = data.get("passos_receita")
        num_porcao = int(data.get("num_porcao"))
        tipo_porcao = data.get("tipo_porcao")
        categoria = data.get("categoria")
        dificuldade = data.get("dificuldade")
        tempo_min = int(data.get("tempo_min"))
        tempo_hora = int(data.get("tempo_hora"))
        desc = data.get("desc")
        id_usuario = data.get("id_usuario")

        ingredientes = json.dumps(ingredientes_receita)
        passos = json.dumps(passos_receita)  # transformar a lista em formato string JSON. o banco n recebe valores list
        
        receita = Receita(nome, imagem, ingredientes, passos, num_porcao, tipo_porcao, categoria, dificuldade, tempo_hora, tempo_min, desc, id_usuario)  # seria melhor fazer o desempacotamento do data aqui, mas alguns dados precisam ser ajustados

        try:
            id_receita = receita.postar_receita()

            receita.inserir_categoria(id_receita)
            return {"sucesso": "Receita postada com sucesso!"}, 201
        except Exception as e:
            return {"erro": str(e)}, 500
        
    @staticmethod
    def editar_receita(colunas, valores, id_receita):
        Receita.editar_receita(colunas, valores, id_receita)
        return {"mensagem": "Receita atualizada com sucesso"}, 200
    
    @staticmethod
    def editar_categoria(id_receita, categoria):
        Receita.editar_categoria(id_receita, categoria)
        return {"mensagem": "categoria atualizada"}, 200
    
    @staticmethod
    def excluir_receita(id_receita):
        Receita.excluir_receita(id_receita)
        return {"sucesso": "Sua receita foi excluída"}, 200