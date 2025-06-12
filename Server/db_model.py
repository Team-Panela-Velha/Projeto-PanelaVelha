from extensions import db

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id_usuario = db.Column(db.Integer, primary_key=True)
    nome_usuario = db.Column(db.String(50), unique=True)
    senha_usuario = db.Column(db.String(255))
    adm_usuario = db.Column(db.Boolean)

class Receita(db.Model):
    __tablename__ = 'receitas'
    id_receitas = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome_receita = db.Column(db.String(55))
    imagem_receita = db.Column(db.String(255))
    ingredientes = db.Column(db.Text)
    passos_receita = db.Column(db.Text)
    num_porcao = db.Column(db.Integer)
    tipo_porcao = db.Column(db.String(45))
    id_dificuldade = db.Column(db.Integer, db.ForeignKey('dificuldade.id_dificuldade'))
    tempo_hora = db.Column(db.Integer)
    tempo_min = db.Column(db.Integer)
    desc = db.Column(db.String(100))
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id_usuario'))

class Categoria(db.Model):
    __tablename__ = 'categoria'
    id_categoria = db.Column(db.Integer, primary_key=True)
    nome_categoria = db.Column(db.String(55))
    imagem_categoria = db.Column(db.String(255))

class Dificuldade(db.Model):
    __tablename__ = 'dificuldade'
    id_dificuldade = db.Column(db.Integer, primary_key=True)
    descricao_dificuldade = db.Column(db.String(55))

class Favorito(db.Model):
    __tablename__ = 'favoritos'
    id_receita = db.Column(db.Integer, db.ForeignKey('receitas.id_receitas'), primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id_usuario'), primary_key=True)

class ReceitaCategoria(db.Model):
    __tablename__ = 'receita_categoria'
    id_categoria = db.Column(db.Integer, db.ForeignKey('categoria.id_categoria'), primary_key=True)
    id_receita = db.Column(db.Integer, db.ForeignKey('receitas.id_receitas'), primary_key=True)

class Avaliacao(db.Model):
    __tablename__ = 'avaliacao'
    id_avaliacao = db.Column(db.Integer, primary_key=True)
    estrela_avaliacao = db.Column(db.Integer)
    comentario_avaliacao = db.Column(db.Text)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id_usuario'))
    id_receita = db.Column(db.Integer, db.ForeignKey('receitas.id_receitas'))
