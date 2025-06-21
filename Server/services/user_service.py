from flask import current_app, session

from extensions import db


from controllers.user_controller import UserController
from db_model import Usuario

import jwt
import datetime

class UserService:
    def login(nome, senha):
        if not nome or not senha:
            return {"mensagem": "Username and password are required"}, 400
        
        usuario = Usuario(nome_usuario=nome, senha_usuario=senha, adm_usuario=False)
        controlador = UserController(usuario)

        try:
            user = controlador.logar()
            
            if not user:
                return {"mensagem": "Usuário não encontrado"}, 404
            if usuario.senha_usuario != user.senha_usuario:
                return {"mensagem": "Senha incorreta"}, 401
            
            token = jwt.encode({
                'usuario_id': user.id_usuario,
                'usuario_nome': user.nome_usuario,
                'admin': user.adm_usuario,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Expira em 1 hora
            }, current_app.config['SECRET_KEY'], algorithm='HS256')

            return {"token": token}, 200
        except Exception as e:
            return {"erro": str(e)}, 500
        
    def cadastro(nome, senha):
        if not nome or not senha:
            return {"error": "Dados inválidos ou ausentes"}, 400

        usuario = Usuario(nome_usuario=nome, senha_usuario=senha, adm_usuario=False)
        controlador = UserController(usuario)
    
        try:
            controlador.cadastrar()
            return {"sucesso": "Cadastro realizado com sucesso!"}, 201
        except Exception as e:
            return {"erro": str(e)}, 500
        
    def verificar_usuario(token):
        if not token:
            return {"message": "Token is missing"}, 401

        try:
            decoded = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
            return {"usuario": decoded["usuario_nome"], "id_usuario": decoded["usuario_id"], "admin": decoded["admin"]}, 200
        except jwt.ExpiredSignatureError:
            return {"message": "Token expired"}, 402
        except jwt.InvalidTokenError:
            return {"message": "Invalid token"}, 403
        
    @staticmethod
    def listar_usuarios():
        try:
            lista_usuarios = db.consulta_all("SELECT id, nome, admin FROM usuarios")

            usuarios = [
                {"id": row[0], "nome": row[1], "admin": row[2]}
                for row in lista_usuarios
            ]

            return {"usuarios": usuarios}, 200
        except Exception as e:
            return {"erro": str(e)}, 500

    # def is_admin(id_usuario, is_admin):
    #     try:
    #         User_Controller.admin(id_usuario, is_admin)
    #         return{"sucesso": "admin alterado"}, 200
    #     except Exception as e:
    #         return{"erro": str(e)}, 500

