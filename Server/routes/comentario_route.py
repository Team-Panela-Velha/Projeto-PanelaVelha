from flask import Blueprint, request, jsonify
from controllers.comentario_controller import ComentarioController

comentario_route = Blueprint("comentario", __name__)

@comentario_route.route("/api/comentarios/<int:id_receita>", methods=["GET"])
def listar_comentarios(id_receita):
    response, status = ComentarioController.listar_comentarios(id_receita)
    return jsonify(response), status

@comentario_route.route("/api/comentarios", methods=["POST"])
def adicionar_comentario():
    data = request.get_json()
    response, status = ComentarioController.adicionar_comentario(data)
    return jsonify(response), status