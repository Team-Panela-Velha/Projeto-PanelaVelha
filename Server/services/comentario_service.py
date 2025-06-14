from extensions import db

class ComentarioService:
    @staticmethod
    def adicionar_comentario(data):
        try:
            db.query(
                "INSERT INTO comentarios (id_receita, nome, email, comentario, avaliacao, data) VALUES (?, ?, ?, ?, ?, ?)",
                (
                    data["id_receita"],
                    data["nome"],
                    data["email"],
                    data["comentario"],
                    data["avaliacao"],
                    data["data"]
                )
            )
            return {"mensagem": "Comentário adicionado com sucesso"}, 201
        except Exception as e:
            return {"erro": str(e)}, 500

    @staticmethod
    def listar_comentarios(id_receita):
        try:
            rows = db.consulta_all(
                "SELECT nome, email, comentario, avaliacao, data FROM comentarios WHERE id_receita = ? ORDER BY id_comentario DESC",
                (id_receita,)
            )
            comentarios = [
                {
                    "nome": row[0],
                    "email": row[1],
                    "comentario": row[2],
                    "avaliacao": row[3],
                    "data": row[4]
                }
                for row in rows
            ]
            return {"comentarios": comentarios}, 200
        except Exception as e:
            return {"erro": str(e)}, 500