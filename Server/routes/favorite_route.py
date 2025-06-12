from flask import request, jsonify, Blueprint
from services.favorite_service import FavoriteService

favorite_route = Blueprint("favorito", __name__)

@favorite_route.route("/api/favorito/<int:id>", methods=["POST"])
def favorito(id):
    data = request.get_json()
    id_usuario = data.get("id_usuario")
    response, status = FavoriteService.favoritar(id_usuario, id)
    return jsonify(response), status

@favorite_route.route("/api/checar_favorito/<int:id>", methods=["GET"])
def verificar_favorito(id):
    token = request.headers.get('Authorization')
    response, status = FavoriteService.verificar_favorito(token, id)
    return jsonify(response), status