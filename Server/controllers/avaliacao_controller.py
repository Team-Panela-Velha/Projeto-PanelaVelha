from services.avaliacao_service import AvaliacaoService

class AvaliacaoController:
    @staticmethod
    def adicionar_avaliacao(data):
        return AvaliacaoService.adicionar_avaliacao(data)

    @staticmethod
    def listar_avaliacoes(id_receita):
        return AvaliacaoService.listar_avaliacoes(id_receita)

    @staticmethod
    def editar_avaliacao(id_avaliacao, data):
        return AvaliacaoService.editar_avaliacao(
            id_avaliacao,
            data["estrela_avaliacao"],
            data["comentario_avaliacao"]
        )

    @staticmethod
    def excluir_avaliacao(id_avaliacao):
        return AvaliacaoService.excluir_avaliacao(id_avaliacao)

    @staticmethod
    def media_avaliacoes(id_receita):
        return AvaliacaoService.media_avaliacoes(id_receita)