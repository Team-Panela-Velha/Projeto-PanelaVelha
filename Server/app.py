from flask import Flask
from flask_cors import CORS
from extensions import db, migrate

def create_app():
    app = Flask(__name__)

    app.secret_key = "a31f6cf0dec107d67ab60dd2bd08c78998cdcf3f58cf79d3713e7812b01c1e1f"
    app.config["SECRET_KEY"] = "a31f6cf0dec107d67ab60dd2bd08c78998cdcf3f58cf79d3713e7812b01c1e1f"
    
    # Configuração do banco de dados MySQL
    app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:8609m@localhost:3306/db_panela_velha"
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

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)