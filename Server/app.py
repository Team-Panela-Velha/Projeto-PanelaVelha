import sqlite3
import jwt
import json
import datetime
from flask import Flask, session, render_template, request, g, jsonify
# from dotenv import load_dotenv
from flask_cors import CORS

from Database import Usuario, Receita

app = Flask(__name__)

app.secret_key = "chave_secreta_padrao"
app.config["SECRET_KEY"] = "chave_secreta_padrao"

CORS(app)             # necessario por conta da interaçao entre react e flask


class CriarDB:                    # classe usada para estabelecer conexao com um bd e fecha-lo quando necessario
    def __init__(self, nome):
        self.conexao = sqlite3.connect(nome)
        self.cursor = self.conexao.cursor()

    def fechar_conexao(self):
        self.conexao.close()

# ----------------------------------
criar_tabela = CriarDB("PanelaVelha.db")              # criando o banco de dados principal do sistema

criar_tabela.cursor.execute("PRAGMA foreign_keys = ON;")

criar_tabela.cursor.execute("""
    CREATE TABLE if not exists usuarios(
        id integer primary key autoincrement, 
        nome text not null,
        senha text not null
    )
""")

criar_tabela.cursor.execute("""                     
    CREATE TABLE if not exists receitas(
        id_receita integer primary key autoincrement,
        nome_receita text not null,
        imagem_receita text not null,
        ingredientes text not null,
        passos_receita text not null,
        num_porcao int not null,
        categoria text not null,
        dificuldade text not null,
        tempo_hora int,
        tempo_min int,
        desc text not null,
        id_usuario integer not null,
        FOREIGN KEY (id_usuario) references usuarios(id)
    )
""")

criar_tabela.cursor.execute("""
    CREATE TABLE IF NOT EXISTS ingredientes (
        id_ingrediente INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
    )
""")

criar_tabela.conexao.commit()
criar_tabela.fechar_conexao()
# ----------------------------------


# ROTAS DE USUARIO

@app.route('/api/login', methods=["POST"])
def login():
    data = request.get_json()
    nome = data.get("nome")
    senha = data.get("senha")
    
    if not nome or not senha:
        return jsonify({"mensagem": "Username and password are required"}), 400
    
    db = CriarDB("PanelaVelha.db")
    usuario = Usuario(nome, senha, db)

    try:
        user = usuario.logar()
        
        if not user:
            return jsonify({"mensagem": "Usuário não encontrado"}), 404
        if usuario.senha != user[2]:
            return jsonify({"mensagem": "Senha incorreta"}), 401
        
        token = jwt.encode({
            'usuario_id': user[0],
            'usuario_nome': user[1],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Expira em 1 hora
        }, app.config['SECRET_KEY'], algorithm='HS256')

        return jsonify({"token": token}), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 500
    finally:
        db.fechar_conexao()


@app.route("/api/cadastro", methods=["POST"])
def cadastro():
    data = request.get_json()
    nome = data.get("nome")
    senha = data.get("senha")
    
    if not nome or not senha:
        return jsonify({"error": "Dados inválidos ou ausentes"}), 400

    db = CriarDB("PanelaVelha.db")
    usuario = Usuario(nome, senha, db)
    
    try:
        usuario.cadastrar()
        return jsonify({"sucesso": "Cadastro realizado com sucesso!"}), 201
    except Exception as e:
        return jsonify({"erro": str(e)}), 500
    finally:
        db.fechar_conexao()


@app.route("/api/verificar_usuario", methods=["GET"])
def get_usuario():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"message": "Token is missing"}), 401

    try:
        decoded = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        return jsonify({"usuario": decoded["usuario_nome"], "id": decoded["usuario_id"]})
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401


# ROTAS DE RECEITAS


@app.route("/api/mostrar_receitas", methods=["GET"])
def mostrar_receitas():
    try:
        db = CriarDB("PanelaVelha.db")
        receitas_array =  db.cursor.execute("SELECT id_receita, nome_receita, imagem_receita from receitas").fetchall()

        receitas = [
            {"id": row[0], "nome_receita": row[1], "imagem_receita": row[2]}
            for row in receitas_array
        ]

        return jsonify({"receitas": receitas}), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 500
    finally:
        db.fechar_conexao()


@app.route("/api/mostrar_receitas_populares", methods=["GET"])     
def mostrar_receitas_populares():
    try:
        db = CriarDB("PanelaVelha.db")
        receitas_array = db.cursor.execute("SELECT id_receita, nome_receita, imagem_receita from receitas").fetchmany(6)

        receitas = [
            {"id": row[0], "nome_receita": row[1], "imagem_receita": row[2]}
            for row in receitas_array
        ]

        return jsonify({"receitas": receitas}), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 500
    finally:
        db.fechar_conexao()


@app.route("/api/mostrar_receitas_usuario/<id_usuario>", methods=["GET"])
def mostrar_receitas_usuario(id_usuario):
    try:
        db = CriarDB("PanelaVelha.db")
        receitas_array = db.cursor.execute(
            """SELECT r.id_receita, r.nome_receita, r.imagem_receita from receitas r
               inner join usuarios u on r.id_usuario = u.id
               where u.id = ?""", (id_usuario)
        ).fetchall()

        receitas = [
            {"id": row[0], "nome_receita": row[1], "imagem_receita": row[2]}
            for row in receitas_array
        ]

        return jsonify({"receitas": receitas}), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 500
    finally:
        db.fechar_conexao()


@app.route("/api/receita/<id_receita>", methods=["GET"])
def receita(id_receita):
    try:
        db = CriarDB("PanelaVelha.db")
        receita_array = db.cursor.execute(
            """SELECT r.id_receita, r.nome_receita, r.imagem_receita, r.ingredientes, r.passos_receita, r.num_porcao, r.categoria, r.dificuldade, r.tempo_min, r.tempo_hora, r.desc, u.id, u.nome from receitas r
               inner join usuarios u on r.id_usuario = u.id
               where r.id_receita = ?""", (id_receita)
        ).fetchone()

        receita = {                 # o select devolve uma lista, por isso mudar para um dict
            "id_receita": receita_array[0],
            "nome_receita": receita_array[1],
            "imagem_receita": receita_array[2],
            "ingredientes": receita_array[3],
            "passos_receita": receita_array[4],
            "num_porcao": receita_array[5],
            "categoria": receita_array[6],
            "dificuldade": receita_array[7],
            "tempo_min": receita_array[8],
            "tempo_hora": receita_array[9],
            "desc": receita_array[10],
            "id_usuario": receita_array[11],
            "nome_usuario": receita_array[12]
        } 

        return jsonify({"receita": receita}), 201
        
    except Exception as e:
        return jsonify({"erro": str(e)}), 500
    finally:
        db.fechar_conexao()


@app.route("/api/postar_receita", methods=["POST"])
def postar_receita():
    data = request.get_json()
    nome = data.get("nome_receita")
    imagem = data.get("imagem_receita")
    ingredientes_receita = data.get("ingredientes")
    passos_receita = data.get("passos_receita")
    num_porcao = int(data.get("num_porcao"))
    categoria = data.get("categoria")
    dificuldade = data.get("dificuldade")
    tempo_min = int(data.get("tempo_min"))
    tempo_hora = int(data.get("tempo_hora"))
    desc = data.get("desc")
    id_usuario = data.get("id_usuario")

    ingredientes = json.dumps(ingredientes_receita)
    passos = json.dumps(passos_receita)  # transformar a lista em formato string JSON. o banco n recebe valores list

    if not nome or not id_usuario or not imagem:
        return jsonify({"error": "Dados insuficientes"}), 400
    
    db = CriarDB("PanelaVelha.db")
    receita = Receita(nome, imagem, ingredientes, passos, num_porcao, categoria, dificuldade, tempo_hora, tempo_min, desc, id_usuario, db)  # seria melhor fazer o desempacotamento do data aqui, mas alguns dados precisam ser ajustados

    try:
        receita.postar_receita()
        return jsonify({"sucesso": "Receita postada com sucesso!"}), 201
    except Exception as e:
        return jsonify({"erro": str(e)}), 500
    finally:
        db.fechar_conexao()


@app.route("/api/editar_receita", methods=["PUT"])
def editar_receita():
    ...


@app.route("/api/ingredientes", methods=["GET"])   # para a postagem de receitas
def ingredientes():
    try:
        db = CriarDB("PanelaVelha.db")
        db.cursor.execute("SELECT name FROM ingredientes")  # Consulta os ingredientes existentes
        rows = db.cursor.fetchall()
        ingredientes = [row[0] for row in rows]  # Extrai apenas os nomes
        return jsonify(ingredientes), 200
    except sqlite3.Error as e:
        return jsonify({"erro": f"Erro ao buscar ingredientes: {e}"}), 500
    finally:
        db.fechar_conexao()


@app.route("/api/favorito", methods=["POST"])
def favorito():
    ...


if __name__ == "__main__":
    app.run(debug=True)