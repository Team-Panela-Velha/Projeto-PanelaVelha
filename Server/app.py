from flask import Flask
# from dotenv import load_dotenv
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    app.secret_key = "chave_secreta_padrao"
    app.config["SECRET_KEY"] = "chave_secreta_padrao"

    CORS(app)             # necessario por conta da interaçao entre react e flask

    def registrar_rotas(app):
        from routes.favorite_route import favorite_route
        from routes.recipe_route import recipe_route
        from routes.user_route import user_route
        from routes.category_route import category_route

        app.register_blueprint(favorite_route)
        app.register_blueprint(recipe_route)
        app.register_blueprint(user_route)
        app.register_blueprint(category_route)

    registrar_rotas(app)

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)