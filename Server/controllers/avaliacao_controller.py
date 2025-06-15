from services.avaliacao_service import AvaliacaoService

class AvaliacaoController:
    @staticmethod
    def adicionar_avaliacao(data):
        return AvaliacaoService.adicionar_avaliacao(data)

    @staticmethod
    def listar_avaliacoes(id_receita):
        return AvaliacaoService.listar_avaliacoes(id_receita)