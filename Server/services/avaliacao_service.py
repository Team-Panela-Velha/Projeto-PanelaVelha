from extensions import db

class AvaliacaoService:
    @staticmethod
    def adicionar_avaliacao(data):
        try:
            db.query(
                "INSERT INTO avaliacoes (estrela_avaliacao, comentario_avaliacao, id_usuario, id_receita) VALUES (?, ?, ?, ?)",
                (
                    data["estrela_avaliacao"],
                    data["comentario_avaliacao"],
                    data["id_usuario"],
                    data["id_receita"]
                )
            )
            return {"mensagem": "Avaliação adicionada com sucesso"}, 201
        except Exception as e:
            return {"erro": str(e)}, 500

    @staticmethod
    def listar_avaliacoes(id_receita):
        try:
            rows = db.consulta_all(
                "SELECT a.id_avaliacao, a.estrela_avaliacao, a.comentario_avaliacao, a.data_hora, a.id_usuario, u.nome FROM avaliacoes a JOIN usuarios u ON a.id_usuario = u.id WHERE a.id_receita = ? ORDER BY a.data_hora DESC",
                (id_receita,)
            )
            avaliacoes = [
                {
                    "id_avaliacao": row[0],
                    "estrela_avaliacao": row[1],
                    "comentario_avaliacao": row[2],
                    "data_hora": row[3],
                    "id_usuario": row[4],
                    "nome_usuario": row[5]
                }
                for row in rows
            ]
            return {"avaliacoes": avaliacoes}, 200
        except Exception as e:
            return {"erro": str(e)}, 500