from flask import request, jsonify, Blueprint
from services.user_service import UserService

user_route = Blueprint("usuario", __name__)

@user_route.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    nome = data.get("nome")
    senha = data.get("senha")

    response, status = UserService.login(nome, senha)
    return jsonify(response), status

@user_route.route("/api/cadastro", methods=["POST"])
def cadastro():
    data = request.get_json()
    nome = data.get("nome")
    senha = data.get("senha")

    response, status = UserService.cadastro(nome, senha)
    return jsonify(response), status

@user_route.route("/api/verificar_usuario", methods=["GET"])
def get_usuario():
    token = request.headers.get('Authorization')

    response, status = UserService.verificar_usuario(token)
    return jsonify(response), status
