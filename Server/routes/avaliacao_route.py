from flask import Blueprint, request, jsonify
from controllers.avaliacao_controller import AvaliacaoController

avaliacao_route = Blueprint("avaliacao", __name__)

@avaliacao_route.route("/api/avaliacoes/<int:id_receita>", methods=["GET"])
def listar_avaliacoes(id_receita):
    response, status = AvaliacaoController.listar_avaliacoes(id_receita)
    return jsonify(response), status

@avaliacao_route.route("/api/avaliacoes", methods=["POST"])
def adicionar_avaliacao():
    data = request.get_json()
    response, status = AvaliacaoController.adicionar_avaliacao(data)
    return jsonify(response), status