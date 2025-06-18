from Server.services.review_service import AvaliacaoService

class AvaliacaoController:
    @staticmethod
    def adicionar_avaliacao(data):
        return AvaliacaoService.adicionar_avaliacao(data)

    @staticmethod
    def listar_avaliacoes(id_receita):
        return AvaliacaoService.listar_avaliacoes(id_receita)

    @staticmethod
    def editar_avaliacao(id_avaliacao, data, token):
        return AvaliacaoService.editar_avaliacao(
            id_avaliacao,
            data["estrela_avaliacao"],
            data["comentario_avaliacao"],
            token
        )

    @staticmethod
    def excluir_avaliacao(id_avaliacao, token):
        return AvaliacaoService.excluir_avaliacao(id_avaliacao, token)

    @staticmethod
    def media_avaliacoes(id_receita):
        return AvaliacaoService.media_avaliacoes(id_receita)