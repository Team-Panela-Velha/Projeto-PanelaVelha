import sqlite3
from flask import Flask, session, render_template, request, g, jsonify
# from dotenv import load_dotenv
from flask_cors import CORS

from Database import Usuario

app = Flask(__name__)
app.secret_key = "chave_secreta_padrao"
CORS(app)

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



class CriarDB:
    def __init__(self, nome):
        self.conexao = sqlite3.connect(nome)
        self.cursor = self.conexao.cursor()

    def fechar_conexao(self):
        self.conexao.close()

# ----------------------------------
criar_tabela = CriarDB("PanelaVelha.db")

criar_tabela.cursor.execute("""
    CREATE TABLE if not exists usuarios(
        id integer primary key autoincrement, 
        nome text not null,
        senha text not null
    )
""")
criar_tabela.conexao.commit()
criar_tabela.fechar_conexao()
# ----------------------------------

@app.route('/api/login', methods=["POST"])
def login():
    ...

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

# @app.route('/membros')
# def membros():
#     return {"membros": ["João", "Lucas", "Matheus", "Paulo"]}

if __name__ == "__main__":
    app.run(debug=True)