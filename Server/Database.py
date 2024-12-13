import sqlite3
import json

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
        

# -------------------------------------------


class Receita:
    def __init__(self, nome, imagem, ingredientes, passos, porcao, tipo_porcao, categoria, dificuldade, hora, min, desc, id_usuario):
        self.nome = nome
        self.imagem = imagem
        self.ingredientes = ingredientes
        self.passos = passos
        self.num_porcao = porcao
        self.tipo_porcao = tipo_porcao
        self.categoria = categoria
        self.dificuldade = dificuldade
        self.tempo_hora = hora
        self.tempo_min = min
        self.desc = desc
        self.id_usuario = id_usuario

    def postar_receita(self):
        try:
            categoria = json.dumps(self.categoria)

            db.insert("INSERT INTO receitas (nome_receita, imagem_receita, ingredientes, passos_receita, num_porcao, tipo_porcao, id_categoria, dificuldade, tempo_hora, tempo_min, desc, id_usuario) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", (self.nome, self.imagem, self.ingredientes, self.passos, self.num_porcao, self.tipo_porcao, categoria, self.dificuldade, self.tempo_hora, self.tempo_min, self.desc, self.id_usuario))
        except sqlite3.Error as e:
            raise Exception(f"Erro ao tentar postar receita: {e}")
        
    def inserir_categoria(self, id_receita):
        try:
            for id_categoria in self.categoria:
                db.insert("INSERT INTO receita_categoria (id_categoria, id_receita) values (?, ?)", (id_categoria, id_receita))
                
        except sqlite3.Error as e:
            raise Exception(f"Erro ao inserir categoria: {e}")