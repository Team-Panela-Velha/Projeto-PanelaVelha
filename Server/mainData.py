import sqlite3

class Usuario:
    def __init__(self, nome, senha, db):
        self.nome = nome
        self.senha = senha
        self.db = db

    def cadastrar(self):
        try:
            self.db.cursor.execute("INSERT INTO usuarios (nome, senha) values (?, ?)", (self.nome, self.senha))
            self.db.conexao.commit()
        except sqlite3.Error as e:
            raise Exception(f"Erro ao cadastrar usuário no banco: {e}")