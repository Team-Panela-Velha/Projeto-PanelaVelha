from extensions import db
from db_model import Receita, ReceitaCategoria
import json

class RecipeController:
    def __init__(self, receita: Receita):
        self.receita = receita

    def postar_receita(self):                       # OK
        try:
            db.session.add(self.receita)
            db.session.commit()
            return self.receita.id_receita  # ou id, conforme seu modelo
        except Exception as e:
            db.session.rollback()
            raise Exception(f"Erro ao tentar postar receita: {e}")

    def inserir_categoria(self, id):                  # OK
        try:
            lista_string = json.loads(self.receita.id_categoria)
            lista_int = [int(i) for i in lista_string]
            for id_categoria in lista_int:
                rc = ReceitaCategoria(id_categoria=id_categoria, id_receita=id)
                db.session.add(rc)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise Exception(f"Erro ao inserir categoria: {e}")

    @staticmethod
    def editar_receita(id_receita, novos_dados):
        try:
            receita = db.session.query(Receita).filter_by(id_receita = id_receita).first()

            for key, value in novos_dados.items():
                if isinstance(value, list):
                    value = json.dumps(value)

                setattr(receita, key, value)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise Exception(f"Erro ao editar receita: {e}")

    @staticmethod
    def editar_categoria(id_receita, categorias):
        try:
            ReceitaCategoria.query.filter_by(id_receita=id_receita).delete()
            for id_categoria in categorias:
                rc = ReceitaCategoria(id_categoria=id_categoria, id_receita=id_receita)
                db.session.add(rc)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise Exception(f"Erro ao editar categoria: {e}")

    @staticmethod
    def excluir_receita(id):
        try:
            ReceitaCategoria.query.filter_by(id_receita=id).delete()
            Receita.query.filter_by(id_receita=id).delete()
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise Exception(f"Erro ao excluir receita: {e}")