from flask import Flask
from flask_cors import CORS # Precisei instalar e importar o cors para transeferir os dados do local host do flask para o localh do react

app = Flask(__name__)
CORS(app) 

@app.route('/membros')
def membros():
    return {"membros": ["João", "Lucas", "Matheus", "Paulo"]}

if __name__ == "__main__":
    app.run(debug=True)