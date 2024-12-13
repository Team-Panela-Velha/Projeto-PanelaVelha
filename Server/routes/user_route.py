from flask import Flask, request, jsonify, Blueprint, current_app
import jwt
import datetime

from extensions import db
from Database import Usuario

user_route = Blueprint("usuario", __name__)

@user_route.route('/api/login', methods=["POST"])
def login():
    data = request.get_json()
    nome = data.get("nome")
    senha = data.get("senha")
    
    if not nome or not senha:
        return jsonify({"mensagem": "Username and password are required"}), 400
    
    usuario = Usuario(nome, senha)

    try:
        user = usuario.logar()
        
        if not user:
            return jsonify({"mensagem": "Usuário não encontrado"}), 404
        if usuario.senha != user[2]:
            return jsonify({"mensagem": "Senha incorreta"}), 401
        
        token = jwt.encode({
            'usuario_id': user[0],
            'usuario_nome': user[1],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Expira em 1 hora
        }, current_app.config['SECRET_KEY'], algorithm='HS256')

        return jsonify({"token": token}), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 500



@user_route.route("/api/cadastro", methods=["POST"])
def cadastro():
    data = request.get_json()
    nome = data.get("nome")
    senha = data.get("senha")
    
    if not nome or not senha:
        return jsonify({"error": "Dados inválidos ou ausentes"}), 400

    usuario = Usuario(nome, senha, db)
    
    try:
        usuario.cadastrar()
        return jsonify({"sucesso": "Cadastro realizado com sucesso!"}), 201
    except Exception as e:
        return jsonify({"erro": str(e)}), 500



@user_route.route("/api/verificar_usuario", methods=["GET"])
def get_usuario():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"message": "Token is missing"}), 401

    try:
        decoded = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
        return jsonify({"usuario": decoded["usuario_nome"], "id": decoded["usuario_id"]})
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401