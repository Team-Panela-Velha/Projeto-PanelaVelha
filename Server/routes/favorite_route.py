from flask import request, jsonify, Blueprint
from services.favorite_service import FavoriteService

favorite_route = Blueprint("favorito", __name__)

@favorite_route.route("/api/favorito/<id_receita>", methods=["POST"])
def favorito(id_receita):
    data = request.get_json()
    id_usuario = data.get("id_usuario")

    response, status = FavoriteService.favoritar(id_usuario, id_receita)
    return jsonify(response), status
    

@favorite_route.route("/api/checar_favorito/<id_receita>", methods=["GET"])
def verificar_favorito(id_receita):
        token = request.headers.get('Authorization')
        
        response, status = FavoriteService.verificar_favorito(token, id_receita)
        return jsonify(response), status