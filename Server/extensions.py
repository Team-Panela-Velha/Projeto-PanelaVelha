import sqlite3

class GerenciadorDB:                    # classe usada para estabelecer conexao com um bd e fecha-lo quando necessario
    def __init__(self, nome):
        self.nome = nome

    def conectar(self):
        conexao = sqlite3.connect(self.nome, check_same_thread=False)
        cursor = conexao.cursor()

        return conexao, cursor

    def fechar_conexao(self, conexao):
        conexao.close()


# evitar multiplos cursores


    def insert(self, consulta, parametros=None):
        conexao, cursor = self.conectar()

        try: 
            cursor.execute(consulta, parametros)
            conexao.commit()
        finally:
            self.fechar_conexao(conexao)

    def consulta_all(self, select, parametros=None):
        conexao, cursor = self.conectar()

        try:
            resultados = cursor.execute(select, parametros or ()).fetchall()
            return resultados
        finally:
            self.fechar_conexao(conexao)

    def consulta_many(self, select, num, parametros=None):
        conexao, cursor = self.conectar()
        
        try:
            resultados = cursor.execute(select, parametros or ()).fetchmany(num)
            return resultados
        finally:
            self.fechar_conexao(conexao)

    def consulta_one(self, select, parametros=None):
        conexao, cursor = self.conectar()
        
        try:
            resultados = cursor.execute(select, parametros or ()).fetchone()
            return resultados
        finally:
            self.fechar_conexao(conexao)
# ----------------------------------

db = GerenciadorDB("PanelaVelha.db")              # criando o banco de dados principal do sistema