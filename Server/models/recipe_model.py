class Receita:
    def __init__(self, nome, imagem, ingredientes, passos, porcao, tipo_porcao, categoria, dificuldade, hora, min, desc, id_usuario):
        self.nome = nome
        self.imagem = imagem
        self.ingredientes = ingredientes
        self.passos = passos
        self.num_porcao = porcao
        self.tipo_porcao = tipo_porcao
        self.categoria = categoria
        self.dificuldade = dificuldade
        self.tempo_hora = hora
        self.tempo_min = min
        self.desc = desc
        self.id_usuario = id_usuario