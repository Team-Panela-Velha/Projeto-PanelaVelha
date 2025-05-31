import sqlite3

from extensions import db
from models.user_model import Usuario


class User_Controller:
    def __init__(self, usuario: Usuario):
        self.usuario = usuario

    def cadastrar(self):
        try:
            db.query("INSERT INTO usuarios (nome, senha) values (?, ?)", (self.usuario.nome, self.usuario.senha))
            # db.query("INSERT INTO usuarios (nome, senha, admin) values (?, ?, ?)", ("teste_admin", "teste123", 1))
        except sqlite3.Error as e:
            raise Exception(f"Erro ao cadastrar usuário no banco: {e}")
        
    def logar(self):
        try:
            user = db.consulta_one("SELECT * from usuarios where nome = ?", (self.usuario.nome,))
            return user
        except sqlite3.Error as e:
            raise Exception(f"Erro no login: {e}")