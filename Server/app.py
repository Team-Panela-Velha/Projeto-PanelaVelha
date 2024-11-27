import sqlite3
import jwt
import datetime
from flask import Flask, session, render_template, request, g, jsonify
# from dotenv import load_dotenv
from flask_cors import CORS

from Database import Usuario

app = Flask(__name__)

app.secret_key = "chave_secreta_padrao"
app.config["SECRET_KEY"] = "chave_secreta_padrao"

CORS(app)             # necessario por conta da interaçao entre react e flask

# @app.route('/ingredientes')
# def index():
#     data = get_db()
#     return jsonify(data)

# def get_db():
#     try:
#         db = getattr(g, '_database', None)
#         if db is None:
#             db = g._database = sqlite3.connect('ingredientes.db')
#             db.row_factory = sqlite3.Row  # Permite acessar colunas por nome
#             cursor = db.cursor()
#             cursor.execute("select * from ingredientes")
#         rows = cursor.fetchall()
#         return [dict(row) for row in rows]
#     except sqlite3.Error as e:
#         print(f"Erro no banco de dados: {e}")
#         return []

# @app.teardown_appcontext
# def close_connection(exception):
#     db = getattr(g, '_database', None)
#     if db is not None:
#         db.close()



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
            'user_id': user[0],
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


@app.route("/api/mostrar_receitas", methods=["GET"])      # Para a pag inicial ou pag qualquer outra pag q mostre varias receitas
def mostrar_receitas():
    ...


@app.route("/api/receita/<nome_receita>", methods=["GET"])
def receita(nome_receita):
    ...  # buscar os dados da receita pelo nome


@app.route("/api/postar_receita", methods=["POST"])
def postar_receita():
    ...


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