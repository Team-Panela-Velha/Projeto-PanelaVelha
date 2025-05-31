import sqlite3
import json

from extensions import db
from models.recipe_model import Receita

class Recipe_Controller:
    def __init__(self, receita: Receita):
        self.receita = receita

    def postar_receita(self):
        try:
            categoria = json.dumps(self.receita.categoria)
            lastrowid = db.query("INSERT INTO receitas (nome_receita, imagem_receita, ingredientes, passos_receita, num_porcao, tipo_porcao, id_categoria, dificuldade, tempo_hora, tempo_min, desc, id_usuario) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", (self.receita.nome, self.receita.imagem, self.receita.ingredientes, self.receita.passos, self.receita.num_porcao, self.receita.tipo_porcao, categoria, self.receita.dificuldade, self.receita.tempo_hora, self.receita.tempo_min, self.receita.desc, self.receita.id_usuario))
            return lastrowid
        except sqlite3.Error as e:
            raise Exception(f"Erro ao tentar postar receita: {e}")
 
    def inserir_categoria(self, id_receita):
        try:
            for id_categoria in self.receita.categoria:
                db.query("INSERT INTO receita_categoria (id_categoria, id_receita) values (?, ?)", (id_categoria, id_receita))
                
        except sqlite3.Error as e:
            raise Exception(f"Erro ao inserir categoria: {e}")
        
    @staticmethod
    def editar_receita(colunas, valores, id_receita):
        try:
            db.query(f"UPDATE receitas SET {colunas} WHERE id_receita = ?", (*valores, id_receita))
        except sqlite3.Error as e:
            raise Exception(f"Erro ao editar receita: {e}")
        
    @staticmethod
    def editar_categoria(id_receita, categoria):
        try:
            db.query("DELETE from receita_categoria WHERE id_receita = ?", id_receita)
            
            for id_categoria in categoria:
                db.query("INSERT INTO receita_categoria (id_categoria, id_receita) values (?, ?)", (id_categoria, id_receita))
        except sqlite3.Error as e:
            raise Exception(f"Erro ao editar categoria: {e}")
        
    @staticmethod
    def excluir_receita(id_receita):
        try:
            db.query("DELETE from receitas WHERE id_receita = ?", (id_receita, ))
        except sqlite3.Error as e:
            raise Exception(f"Erro ao excluir receita: {e}")