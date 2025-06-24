from flask import Blueprint, request, jsonify
from services.review_service import AvaliacaoService

review_route = Blueprint("avaliacao", __name__)

@review_route.route("/api/avaliacoes/<int:id_receita>", methods=["GET"])
def listar_avaliacoes(id_receita):
    response, status = AvaliacaoService.listar_avaliacoes(id_receita)
    return jsonify(response), status

@review_route.route("/api/criar_avaliacao", methods=["POST"])
def adicionar_avaliacao():
    data = request.get_json()
    id_usuario = data.get("id_usuario")
    comentario = data.get("comentario")
    avaliacao = data.get("avaliacao")
    id_receita = data.get("id_receita")

    response, status = AvaliacaoService.adicionar_avaliacao(id_usuario, comentario, avaliacao, id_receita)
    return jsonify(response), status

@review_route.route("/api/editar_avaliacao/<int:id_avaliacao>", methods=["PATCH"])
def editar_avaliacao(id_avaliacao):
    token = request.headers.get('Authorization')
    data = request.get_json()
    response, status = AvaliacaoService.editar_avaliacao(id_avaliacao, data, token)
    return jsonify(response), status

@review_route.route("/api/deletar_avaliacao/<int:id_avaliacao>", methods=["DELETE"])
def excluir_avaliacao(id_avaliacao):
    token = request.headers.get('Authorization')
    response, status = AvaliacaoService.excluir_avaliacao(id_avaliacao, token)
    return jsonify(response), status

@review_route.route("/api/avaliacoes/media/<int:id_receita>", methods=["GET"])
def media_avaliacoes(id_receita):
    response, status = AvaliacaoService.media_avaliacoes(id_receita)
    return jsonify(response), status