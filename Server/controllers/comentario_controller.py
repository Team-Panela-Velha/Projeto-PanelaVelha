from services.comentario_service import ComentarioService

class ComentarioController:
    @staticmethod
    def adicionar_comentario(data):
        return ComentarioService.adicionar_comentario(data)

    @staticmethod
    def listar_comentarios(id_receita):
        return ComentarioService.listar_comentarios(id_receita)