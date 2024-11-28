import sqlite3
import jwt
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

criar_tabela.cursor.execute("""
    CREATE TABLE if not exists usuarios(
        id integer primary key autoincrement, 
        nome text not null,
        senha text not null
    )
""")

criar_tabela.cursor.execute("""
    CREATE TABLE if not exists receitas(
        id integer primary key autoincrement,
        nome_receita text not null,
        imagem_receita text not null,
        id_usuario integer not null,
        FOREIGN KEY (id_usuario) references usuarios(id)
    )
""")

criar_tabela.cursor.execute("""
    CREATE TABLE IF NOT EXISTS ingredientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
    )
""")

criar_tabela.conexao.commit()
criar_tabela.fechar_conexao()
# ----------------------------------


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


@app.route("/api/mostrar_receitas", methods=["GET"])      # Para a pag inicial ou pag qualquer outra pag q mostre varias receitas
def mostrar_receitas():
    try:
        db = CriarDB("PanelaVelha.db")
        receitas_array = db.cursor.execute("SELECT id, nome_receita, imagem_receita from receitas").fetchmany(6)

        receitas = [
            {"id": row[0], "nome_receita": row[1], "imagem_receita": row[2]}
            for row in receitas_array
        ]

        return jsonify({"receitas": receitas})
    except Exception as e:
        return jsonify({"erro": str(e)}), 500
    finally:
        db.fechar_conexao()


@app.route("/api/receita/<id_receita>", methods=["GET"])
def receita(id_receita):
    try:
        db = CriarDB("PanelaVelha.db")
        receita = db.cursor.execute("SELECT * from receitas where id = ?", (id_receita)).fetchone()

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
    id_usuario = data.get("id_usuario")

    if not nome or not id_usuario or not imagem:
        return jsonify({"error": "Dados insuficientes"}), 400
    
    db = CriarDB("PanelaVelha.db")
    receita = Receita(nome, imagem, id_usuario, db)

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


# testando
# @app.route("/api/teste", methods=["GET"])
# def teste():
#     token = request.headers.get('Authorization')
#     if not token:
#         return jsonify({"message": "Token is missing"}), 401

#     try:
#         decoded = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
#         return jsonify({"Welcome": decoded["user_name"], "id": decoded["user_id"]})
#     except jwt.ExpiredSignatureError:
#         return jsonify({"message": "Token expired"}), 401
#     except jwt.InvalidTokenError:
#         return jsonify({"message": "Invalid token"}), 401


if __name__ == "__main__":
    app.run(debug=True)