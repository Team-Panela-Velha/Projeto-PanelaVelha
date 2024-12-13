from flask import Flask, request, jsonify, Blueprint, current_app
import jwt

from extensions import db

favorite_route = Blueprint("favorito", __name__)

@favorite_route.route("/api/favorito/<id_receita>", methods=["POST"])
def favorito(id_receita):
    try:
        data = request.get_json()
        id_usuario = data.get("id_usuario")

        checarFavorito = db.consulta_one("SELECT * from favoritos WHERE id_usuario = ? AND id_receita = ?", (id_usuario, id_receita))

        if not checarFavorito:
            db.insert("INSERT into favoritos (id_usuario, id_receita) values (?, ?)", (id_usuario, id_receita))
            return jsonify({"mensagem": "receita favoritada"}), 200
        else:
            db.insert("DELETE from favoritos WHERE id_usuario = ?", (id_usuario,))
            return jsonify({"mensagem": "receita desfavoritada"})
    except Exception as e:
        return jsonify({"erro": str(e)}), 500
    

@favorite_route.route("/api/checar_favorito/<id_receita>", methods=["GET"])
def verificar_favorito(id_receita):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"message": "Token is missing"}), 401
   
        decoded = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
        id_usuario = decoded["usuario_id"]

        checarFavorito = db.consulta_one("SELECT * from favoritos WHERE id_usuario = ? AND id_receita = ?", (id_usuario, id_receita))

        if not checarFavorito:
            return jsonify({"favorito": False}), 200
        else:
            return jsonify({"favorito": True}), 200