# Imagem do banco com schema, dados e objetos embutidos: funciona em qualquer nó do Swarm,
# sem depender de bind mount. Os scripts rodam só na primeira inicialização (volume vazio).
FROM mysql:8.4

ENV MYSQL_DATABASE=db_panela_velha

COPY init/ /docker-entrypoint-initdb.d/

HEALTHCHECK --interval=10s --timeout=5s --start-period=60s --retries=5 \
    CMD mysqladmin ping -h 127.0.0.1 --silent || exit 1
