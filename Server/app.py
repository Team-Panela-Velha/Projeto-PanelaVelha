from flask import Flask
from flask_cors import CORS
from extensions import db, migrate

def create_app():
    app = Flask(__name__)

    app.secret_key = "chave_secreta_padrao"
    app.config["SECRET_KEY"] = "chave_secreta_padrao"

    # Configuração do banco de dados MySQL
    app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:1234@localhost/db_panela_velha"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)  # Inicializa o banco com o app
    migrate.init_app(app, db)

    CORS(app)  # necessário por conta da interação entre React e Flask

    def registrar_rotas(app):
        from routes.favorite_route import favorite_route
        from routes.recipe_route import recipe_route
        from routes.user_route import user_route

        app.register_blueprint(favorite_route)
        app.register_blueprint(recipe_route)
        app.register_blueprint(user_route)

    registrar_rotas(app)

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
