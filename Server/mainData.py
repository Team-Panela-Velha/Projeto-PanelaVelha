import sqlite3

class Usuario:
    def __init__(self, nome, senha, db):
        self.nome = nome
        self.senha = senha
        self.db = db

    def cadastrar(self):
        self.db.cursor.execute("INSERT INTO usuarios (nome, senha) values (?, ?)", (self.nome, self.senha))
        self.db.conexao.commit()
