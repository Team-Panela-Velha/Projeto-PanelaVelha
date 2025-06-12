from flask import Blueprint, jsonify
from services.recipe_service import RecipeService

recipe_route = Blueprint("receita", __name__)

@recipe_route.route("/api/mostrar_receitas", methods=["GET"])
def mostrar_receitas():
    response, status = RecipeService.mostrar_receitas()
    return jsonify(response), status

@recipe_route.route("/api/mostrar_receitas_populares", methods=["GET"])
def mostrar_receitas_populares():
    response, status = RecipeService.mostrar_receitas_populares()
    return jsonify(response), status

@recipe_route.route("/api/mostrar_receitas_mais", methods=["GET"])
def mostrar_receitas_mais():
    response, status = RecipeService.mostrar_receitas_mais()
    return jsonify(response), status
