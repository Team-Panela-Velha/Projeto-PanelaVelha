from extensions import db
from db_model import Usuario


class UserController:
    def __init__(self, usuario: Usuario):
        self.usuario = usuario

    def cadastrar(self):
        try:
            db.session.add(self.usuario)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise Exception(f"Erro ao cadastrar usuário no banco: {e}")

    def logar(self):
        try:
            user = Usuario.query.filter_by(nome=self.usuario.nome).first()
            return user
        except Exception as e:
            raise Exception(f"Erro no login: {e}")