import sqlite3
from extensions import db

class Usuario:
    def __init__(self, nome, senha):
        self.nome = nome
        self.senha = senha

    def cadastrar(self):
        try:
            db.insert("INSERT INTO usuarios (nome, senha) values (?, ?)", (self.nome, self.senha))
        except sqlite3.Error as e:
            raise Exception(f"Erro ao cadastrar usuário no banco: {e}")
        
    def logar(self):
        try:
            user = db.consulta_one("SELECT * from usuarios where nome = ?", (self.nome,))
            return user
        except sqlite3.Error as e:
            raise Exception(f"Erro no login: {e}")