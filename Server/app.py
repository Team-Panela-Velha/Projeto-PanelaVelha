import os
from urllib.parse import quote_plus

from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
from sqlalchemy import text
from extensions import db, migrate

load_dotenv()  # carrega Server/.env em desenvolvimento local (no container as variáveis vêm do ambiente)

def ler_config(nome, padrao=None):
    # Docker secrets: se existir NOME_FILE, lê o valor do arquivo (ex.: /run/secrets/db_password)
    arquivo = os.getenv(f"{nome}_FILE")
    if arquivo:
        with open(arquivo) as f:
            return f.read().strip()
    return os.getenv(nome, padrao)

def create_app():
    app = Flask(__name__)

    app.config["SECRET_KEY"] = ler_config("SECRET_KEY", "dev-secret-key")

    # Configuração do banco de dados MySQL
    db_user = ler_config("DB_USER", "root")
    db_password = quote_plus(ler_config("DB_PASSWORD", ""))
    db_host = ler_config("DB_HOST", "localhost")
    db_port = ler_config("DB_PORT", "3306")
    db_name = ler_config("DB_NAME", "db_panela_velha")
    app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
    app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {"pool_pre_ping": True}  # reconecta se o MySQL reiniciar
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)  # Inicializa o banco com o app
    migrate.init_app(app, db)

    CORS(app, supports_credentials=True)  # necessário por conta da interação entre React e Flask

    def registrar_rotas(app):
        from routes.favorite_route import favorite_route
        from routes.recipe_route import recipe_route
        from routes.user_route import user_route
        from routes.category_route import category_route
        from routes.review_route import review_route

        app.register_blueprint(favorite_route)
        app.register_blueprint(recipe_route)
        app.register_blueprint(user_route)
        app.register_blueprint(category_route)
        app.register_blueprint(review_route)

    registrar_rotas(app)

    @app.route("/api/health", methods=["GET"])      # usado pelo healthcheck do Docker
    def health():
        try:
            db.session.execute(text("SELECT 1"))
            return jsonify({"status": "ok"}), 200
        except Exception:
            return jsonify({"status": "erro", "detalhe": "banco indisponível"}), 503

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
