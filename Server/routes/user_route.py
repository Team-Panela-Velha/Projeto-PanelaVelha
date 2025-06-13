from flask import request, jsonify, Blueprint, session
from services.user_service import UserService, login
from db_model import Usuario

user_route = Blueprint("usuario", __name__)

@user_route.route("/api/login", methods=["POST"])
def login_route():
    data = request.get_json()
    nome = data.get("nome")
    senha = data.get("senha")
    return login(nome, senha)

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

@user_route.route("/api/listar_usuarios", methods=["GET"])
def listar_usuarios():
    response, status = UserService.listar_usuarios()
    return jsonify(response), status

@user_route.route("/api/is_admin", methods=["POST"])
def is_admin():
    data = request.get_json()
    id_usuario = data.get("id_usuario")
    is_admin = int(data.get("admin"))

    response, status = UserService.is_admin(id_usuario, is_admin)
    return jsonify(response), status

@user_route.route('/api/perfil', methods=['GET'])
def perfil_route():
    id_usuario = session.get('id_usuario')
    if not id_usuario:
        return {"erro": "Não autenticado"}, 401
    usuario = Usuario.query.get(id_usuario)
    if not usuario:
        return {"erro": "Usuário não encontrado"}, 404
    return {
        "id": usuario.id_usuario,
        "nome": usuario.nome_usuario,
        "adm": usuario.adm_usuario
    }, 200
