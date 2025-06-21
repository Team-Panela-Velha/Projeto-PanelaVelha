from flask import current_app
from extensions import db
from db_model import Favorito

import jwt

class FavoriteService:
    @staticmethod
    def favoritar(id_usuario, id_receita):
        if not id_usuario:
            return {"erro": "usuário não identificado"}
        
        try:
            checarFavorito = db.session.query(Favorito).\
            filter(Favorito.id_usuario == id_usuario and Favorito.id_receita == id_receita).first()

            if not checarFavorito:
                temporario = Favorito(id_receita=id_receita, id_usuario=id_usuario)
                db.session.add(temporario)
                db.session.commit()
                
                return {"mensagem": "receita favoritada"}, 200
            else:
                Favorito.query.filter_by(id_receita=id_receita).delete()
                db.session.commit()

                return {"mensagem": "receita desfavoritada"}, 200
        except Exception as e:
            db.session.rollback()
            return {"erro": str(e)}, 500
        
    
    @staticmethod
    def verificar_favorito(token, id_receita):
        if not token:
            return {"message": "Token is missing"}, 401
   
        decoded = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
        id_usuario = decoded["usuario_id"]

        checarFavorito = db.session.query(Favorito).\
        filter(Favorito.id_usuario == id_usuario and Favorito.id_receita == id_receita).first()
        
        if not checarFavorito:
            return {"favorito": False}, 200
        else:
            return {"favorito": True}, 200