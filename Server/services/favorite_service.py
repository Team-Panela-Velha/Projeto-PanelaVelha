from flask import current_app
from extensions import db
import jwt

class FavoriteService:
    @staticmethod
    def favoritar(id_usuario, id_receita):
        try:
            checarFavorito = db.consulta_one("SELECT * from favoritos WHERE id_usuario = ? AND id_receita = ?", (id_usuario, id_receita))

            if not checarFavorito:
                db.insert("INSERT into favoritos (id_usuario, id_receita) values (?, ?)", (id_usuario, id_receita))
                return {"mensagem": "receita favoritada"}, 200
            else:
                db.insert("DELETE from favoritos WHERE id_receita = ?", (id_receita,))
                return {"mensagem": "receita desfavoritada"}, 200
        except Exception as e:
            return {"erro": str(e)}, 500
        
    
    @staticmethod
    def verificar_favorito(token, id_receita):
        if not token:
            return {"message": "Token is missing"}, 401
   
        decoded = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
        id_usuario = decoded["usuario_id"]

        checarFavorito = db.consulta_one("SELECT * from favoritos WHERE id_usuario = ? AND id_receita = ?", (id_usuario, id_receita))

        if not checarFavorito:
            return {"favorito": False}, 200
        else:
            return {"favorito": True}, 200