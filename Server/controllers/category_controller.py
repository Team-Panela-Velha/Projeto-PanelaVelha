import sqlite3
from extensions import db
from models.category_model import Categoria

class Category_Controller:
    def __init__(self, categoria: Categoria):
        self.categoria = categoria

    def criar_categoria(self):
        try:
            lastrowid = db.query("INSERT INTO categorias (nome_categoria) values (?)", (self.categoria.nome,))
            return lastrowid
        except sqlite3.Error as e:
            raise Exception(f"Erro ao tentar criar categoria: {e}")
        
    @staticmethod
    def editar_categoria(nome, id_categoria):
        try:
            db.query("UPDATE categorias SET nome_categoria = ? WHERE id_categoria = ?", (nome, id_categoria,))
        except sqlite3.Error as e:
            raise Exception(f"Erro ao editar categoria: {e}")
        
    @staticmethod
    def excluir_categoria(id_categoria):
        try:
            db.query("DELETE from categorias WHERE id_categoria = ?", (id_categoria, ))
        except sqlite3.Error as e:
            raise Exception(f"Erro ao excluir categoria: {e}")