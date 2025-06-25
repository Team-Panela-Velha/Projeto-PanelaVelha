from flask import request, jsonify, Blueprint
import json
from extensions import db

from services.recipe_service import RecipeService

recipe_route = Blueprint("receita", __name__)


# ROTAS DE RECEITA (GET)


@recipe_route.route("/api/mostrar_receitas", methods=["GET"]) #ok
def mostrar_receitas():
    response, status = RecipeService.mostrar_receitas()
    return jsonify(response), status


@recipe_route.route("/api/mostrar_receitas_populares", methods=["GET"])     #ok
def mostrar_receitas_populares():
    response, status = RecipeService.mostrar_receitas_populares()
    return jsonify(response), status


@recipe_route.route("/api/mostrar_receitas_mais", methods=["GET"]) #ok
def mostrar_receitas_mais():
    response, status = RecipeService.mostrar_receitas_mais()
    return jsonify(response), status


@recipe_route.route("/api/mostrar_receitas/<pesquisa>", methods=["GET"]) #verificar o por que não funciona
def mostrar_receita_pesquisa(pesquisa):
    response, status = RecipeService.mostrar_receita_pesquisa(pesquisa)
    return jsonify(response), status


@recipe_route.route("/api/mostrar_receitas_categoria/<categoria>", methods=["GET"])     # ok
def mostrar_receitas_categoria(categoria):
    response, status = RecipeService.mostrar_receitas_categoria(categoria)
    return jsonify(response), status


@recipe_route.route("/api/slider_categoria/<categoria>", methods=["GET"])               # ok
def slider_categoria(categoria):
    response, status = RecipeService.slider_categoria(categoria)
    return jsonify(response), status


@recipe_route.route("/api/mostrar_receitas_usuario/<id_usuario>", methods=["GET"])      # ok
def mostrar_receitas_usuario(id_usuario):
    response, status = RecipeService.mostrar_receitas_usuario(id_usuario)
    return jsonify(response), status


@recipe_route.route("/api/mostrar_receitas_favoritas/<id_usuario>", methods=["GET"])    # ok
def mostrar_receitas_favoritas(id_usuario):
    response, status = RecipeService.mostrar_receitas_favoritas(id_usuario)
    return jsonify(response), status


@recipe_route.route("/api/receita/<id_receita>", methods=["GET"])                   # OK
def receita(id_receita):
    response, status = RecipeService.receita(id_receita)
    return jsonify(response), status


# ROTA PARA MAPEAR AS CATEGORIAS NA CRIACAO DE RECEITAS


@recipe_route.route("/api/categorias", methods=["GET"])                     # OK
def categorias():
    response, status = RecipeService.categorias()
    return jsonify(response), status


# ROTAS DE CRIACAO DE RECEITA


@recipe_route.route("/api/postar_receita", methods=["POST"])             # OK
def postar_receita():
    data = request.get_json()
    
    response, status = RecipeService.postar_receita(data)
    return jsonify(response), status


@recipe_route.route("/api/editar_receita/<id_receita>", methods=["PATCH"])              # OK
def editar_receita(id_receita):
    data = request.get_json()

    response, status = RecipeService.editar_receita(data, id_receita)
    return jsonify(response), status
    

@recipe_route.route("/api/editar_categoria/<id_receita>", methods=["PATCH"])            # OK
def editar_categoria(id_receita):
    data = request.get_json()
    categoria = data.get("categoria")

    response, status = RecipeService.editar_categoria(int(id_receita), categoria)
    return jsonify(response), status


@recipe_route.route("/api/deletar_receita/<id_receita>", methods=["DELETE"])
def excluir_receita(id_receita):
    response, status = RecipeService.excluir_receita(id_receita)
    return jsonify(response), status