from extensions import db

db.query("PRAGMA foreign_keys = ON;")

db.query("""
    CREATE TABLE if not exists usuarios(
        id integer primary key autoincrement, 
        nome text not null,
        senha text not null,
        admin boolean default 0
    )
""")

db.query("""                     
    CREATE TABLE if not exists receitas(
        id_receita integer primary key autoincrement,
        nome_receita text not null,
        imagem_receita text not null,
        ingredientes text not null,
        passos_receita text not null,
        num_porcao int not null,
        tipo_porcao text not null,
        id_categoria text not null,
        dificuldade text not null,
        tempo_hora int,
        tempo_min int,
        desc text not null,
        id_usuario integer not null,
        FOREIGN KEY (id_usuario) references usuarios(id),
        FOREIGN KEY (id_categoria) references categorias(id_categoria)
    )
""")

db.query("""
    CREATE TABLE IF NOT EXISTS favoritos (
        id_usuario integer not null,
        id_receita integer not null,
        PRIMARY KEY (id_usuario, id_receita),
        FOREIGN KEY (id_usuario) references usuarios(id),
        FOREIGN KEY (id_receita) references rececitas(id_receita)
    )
""")

db.query("""
    CREATE TABLE IF NOT EXISTS categorias (
        id_categoria integer PRIMARY KEY autoincrement,
        nome_categoria text not null
    )
""")

db.query("""
    CREATE TABLE IF NOT EXISTS receita_categoria (
        id_categoria integer not null,
        id_receita integer not null,
        PRIMARY KEY (id_categoria, id_receita),
        FOREIGN KEY (id_categoria) references categorias(id_categoria),
        FOREIGN KEY (id_receita) references receitas(id_receita)
    )
""")