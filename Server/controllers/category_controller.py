import sqlite3
import json
from extensions import db
from models.category_model import Categoria

class Category_Controller:
    def __init__(self, categoria: Categoria):
        self.categoria = categoria

    def criar_categoria(self):
        try:
            categoria = json.dumps(self.receita.categoria)
            lastrowid = db.insert("INSERT INTO categoria (nome_categoria, imagem_categoria) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", (self.categoria.nome, self.categoria.imagem))
            return lastrowid
        except sqlite3.Error as e:
            raise Exception(f"Erro ao tentar criar categoria: {e}")
        
    @staticmethod
    def editar_categoria(colunas, valores, id_categoria):
        try:
            db.insert(f"UPDATE receitas SET {colunas} WHERE id_receita = ?", (*valores, id_categoria))
        except sqlite3.Error as e:
            raise Exception(f"Erro ao editar categoria: {e}")
        
    @staticmethod
    def excluir_categoria(id_categoria):
        try:
            db.insert("DELETE from categorias WHERE id_categoria = ?", (id_categoria, ))
        except sqlite3.Error as e:
            raise Exception(f"Erro ao excluir categoria: {e}")