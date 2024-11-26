import sqlite3

class Usuario:
    def __init__(self, nome, senha, db):
        self.nome = nome
        self.senha = senha
        self.db = db

    def cadastrar(self):
        try:
            self.db.cursor.execute("INSERT INTO usuarios (nome, senha) values (?, ?)", (self.nome, self.senha))
            self.db.conexao.commit()
            
            self.db.cursor.execute("SELECT id from usuarios where nome = ?", (self.nome))
            
        except sqlite3.Error as e:
            raise Exception(f"Erro ao cadastrar usuário no banco: {e}")
        
    def logar(self):
        try:
            user = self.db.cursor.execute("SELECT * from usuarios where nome = ?", (self.nome,)).fetchone()
            return user
        except sqlite3.Error as e:
            raise Exception(f"Erro no login: {e}")
        

class Ingredientes:  # Renomeando a classe para seguir a convenção
    def __init__(self, db):
        self.db = db
    
    def adicionar_ingredientes(self, lista_ingredientes):
        try:
            self.db.cursor.executemany("INSERT INTO ingredientes (name) VALUES (?)", [(item,) for item in lista_ingredientes])
            self.db.conexao.commit()
        except sqlite3.Error as e:
            raise Exception(f"Erro ao adicionar ingredientes no banco: {e}")

# Lista de ingredientes
ingredientes = [
    "apples", "bananas", "clemintines", "dill", "eggs", "flour", "granola",
    "honey", "ice cream", "juice", "ketchup", "lemon", "margarine", "onion",
    "potatoes", "rosmary", "salt", "thyme", "vinegar", "watermelon", "pears",
    "cucumbers", "garlic", "carrots", "pastries", "eggplants", "milk", "coffee",
    "tea", "rice", "noodles", "lentils", "sweet potatoes", "strawberries",
    "cranberries", "mangos", "pappers", "zuccinis", "lime", "broth", "mushrooms",
    "chicken", "beef", "pork", "fish", "cream", "paprika", "tumeric", "cinamon",
    "pumpkin", "basil", "tomatoes", "bread", "cake", "chocolate", "gum", 
    "pinapple", "oranges", "lettuce", "cheese", "cilantro"
]

ingredientes = sorted(ingredientes)