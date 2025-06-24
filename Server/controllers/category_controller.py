import sqlite3
from extensions import db
from db_model import Categoria

class Category_Controller:
    def __init__(self, categoria: Categoria):
        self.categoria = categoria

    def criar_categoria(self):
        try:
            db.session.add(self.categoria)
            db.session.commit()
            return self.categoria.id_categoria
        except Exception as e:
            raise Exception(f"Erro ao tentar criar categoria: {e}")
        
    @staticmethod
    def editar_categoria(nome, id_categoria):
        try:
            categoria = db.session.query(Categoria).filter_by(id_categoria=id_categoria).first()
            categoria.nome_categoria = nome
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise Exception(f"Erro ao editar categoria: {e}")
        
    @staticmethod
    def excluir_categoria(id_categoria):
        try:
            categoria = db.session.query(Categoria).filter_by(id_categoria=id_categoria).first()
            
            if categoria:
                db.session.delete(categoria)
                db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise Exception(f"Erro ao excluir categoria: {e}")