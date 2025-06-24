from extensions import db
from db_model import Avaliacao

class AvaliacaoController:
    def __init__(self, avaliacao: Avaliacao):
        self.avaliacao = avaliacao

    def adicionar_avaliacao(self):
        try:
            db.session.add(self.avaliacao)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise Exception(f"erro ao tentar fazer avaliacao: {e}")
        

    # @staticmethod
    # def editar_avaliacao(id_avaliacao, data, token):
        # return AvaliacaoService.editar_avaliacao(
        #     id_avaliacao,
        #     data["estrela_avaliacao"],
        #     data["comentario_avaliacao"],
        #     token
        # )

    # @staticmethod
    # def excluir_avaliacao(id_avaliacao, token):
        # return AvaliacaoService.excluir_avaliacao(id_avaliacao, token)