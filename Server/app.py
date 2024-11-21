import sqlite3
from flask import Flask, session, render_template, request, g, jsonify
# from dotenv import load_dotenv
from flask_cors import CORS

app = Flask(__name__)
# app.secret_key = "chave_secreta_padrao"
CORS(app)

@app.route('/ingredientes')
def index():
    data = get_db()
    return jsonify(data)

def get_db():
    try:
        db = getattr(g, '_database', None)
        if db is None:
            db = g._database = sqlite3.connect('ingredientes.db')
            db.row_factory = sqlite3.Row  # Permite acessar colunas por nome
            cursor = db.cursor()
            cursor.execute("select * from ingredientes")
        rows = cursor.fetchall()
        return [dict(row) for row in rows]
    except sqlite3.Error as e:
        print(f"Erro no banco de dados: {e}")
        return []

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close

@app.route('/api/login', methods=["POST"])
def login():
    ...

@app.route("/api/cadastro", methods=["POST"])
def cadastro():
    ...

# @app.route('/membros')
# def membros():
#     return {"membros": ["João", "Lucas", "Matheus", "Paulo"]}

if __name__ == "__main__":
    app.run(debug=True)
    
    