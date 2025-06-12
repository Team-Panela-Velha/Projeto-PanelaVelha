from flask import request, jsonify, Blueprint
import sqlite3
import json
from extensions import db
from models.category_model import Categoria
from services.category_service import CategoryService

category_route = Blueprint("categoria", __name__)


# ROTAS DE RECEITA (GET)


@category_route.route("/api/mostrar_categorias", methods=["GET"])
def mostrar_categorias():
    response, status = CategoryService.mostrar_categorias()
    return jsonify(response), status


@category_route.route("/api/pesquisar_categoria/<pesquisa>", methods=["GET"])
def pesquisar_categoria(pesquisa):
    response, status = CategoryService.pesquisar_categoria(pesquisa)
    return jsonify(response), status


# ROTAS DE CRIACAO DE RECEITA


@category_route.route("/api/criar_categoria", methods=["POST"])
def criar_categoria():
    data = request.get_json()
    nome_categoria = data.get("nome_categoria")
    
    response, status = CategoryService.criar_categoria(nome_categoria)
    return jsonify(response), status


@category_route.route("/api/editar_categoria", methods=["PATCH"])
def editar_categoria():
    data = request.get_json()
    nome_categoria = data.get("nome_categoria")
    id_categoria = data.get("id_categoria")

    response, status = CategoryService.editar_categoria(nome_categoria, id_categoria)
    return jsonify(response), status


@category_route.route("/api/excluir_categoria", methods=["DELETE"])
def excluir_categoria():
    data = request.get_json()
    id_categoria = data.get("id_categoria")

    response, status = CategoryService.excluir_categoria(id_categoria)
    return jsonify(response), status