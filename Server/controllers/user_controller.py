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
            user = Usuario.query.filter_by(nome_usuario=self.usuario.nome_usuario).first()
            return user
        except Exception as e:
            raise Exception(f"Erro no login: {e}")

    @staticmethod
    def admin(id_usuario, is_admin):                       # OK
        try:
            if is_admin == 0:
                usuario = db.session.query(Usuario).filter_by(id_usuario=id_usuario).first()
                usuario.adm_usuario = 1
                db.session.commit()
            if is_admin == 1:
                usuario = db.session.query(Usuario).filter_by(id_usuario=id_usuario).first()
                usuario.adm_usuario = 0
                db.session.commit()
        except Exception as e:
            raise Exception(f"Erro ao alterar admin: {e}")