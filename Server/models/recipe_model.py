import sqlite3
import json
from extensions import db

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
            lastrowid = db.insert("INSERT INTO receitas (nome_receita, imagem_receita, ingredientes, passos_receita, num_porcao, tipo_porcao, id_categoria, dificuldade, tempo_hora, tempo_min, desc, id_usuario) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", (self.nome, self.imagem, self.ingredientes, self.passos, self.num_porcao, self.tipo_porcao, categoria, self.dificuldade, self.tempo_hora, self.tempo_min, self.desc, self.id_usuario))
            return lastrowid
        except sqlite3.Error as e:
            raise Exception(f"Erro ao tentar postar receita: {e}")
        
    def inserir_categoria(self, id_receita):
        try:
            for id_categoria in self.categoria:
                db.insert("INSERT INTO receita_categoria (id_categoria, id_receita) values (?, ?)", (id_categoria, id_receita))
                
        except sqlite3.Error as e:
            raise Exception(f"Erro ao inserir categoria: {e}")
        
    @staticmethod
    def editar_receita(colunas, valores, id_receita):
        try:
            db.insert(f"UPDATE receitas SET {colunas} WHERE id_receita = ?", (*valores, id_receita))
        except sqlite3.Error as e:
            raise Exception(f"Erro ao editar receita: {e}")
        
    @staticmethod
    def editar_categoria(id_receita, categoria):
        try:
            db.insert("DELETE from receita_categoria WHERE id_receita = ?", id_receita)
            
            for id_categoria in categoria:
                db.insert("INSERT INTO receita_categoria (id_categoria, id_receita) values (?, ?)", (id_categoria, id_receita))
        except sqlite3.Error as e:
            raise Exception(f"Erro ao editar categoria: {e}")
        
    @staticmethod
    def excluir_receita(id_receita):
        try:
            db.insert("DELETE from receitas WHERE id_receita = ?", (id_receita, ))
        except sqlite3.Error as e:
            raise Exception(f"Erro ao excluir receita: {e}")