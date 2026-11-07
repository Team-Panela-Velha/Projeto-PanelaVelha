#!/bin/bash
# Usuário somente leitura para consultas (origem: Docs/db/Querries.sql).
# A senha vem de MYSQL_VISITANTE_PASSWORD ou MYSQL_VISITANTE_PASSWORD_FILE (Docker secret);
# sem ela o usuário não é criado. file_env e docker_process_sql vêm do entrypoint da imagem mysql.
file_env 'MYSQL_VISITANTE_PASSWORD'

if [ -z "$MYSQL_VISITANTE_PASSWORD" ]; then
    mysql_note "MYSQL_VISITANTE_PASSWORD não definida: usuário 'visitante' não será criado"
    return 0
fi

docker_process_sql --database=mysql <<-EOSQL
    CREATE USER IF NOT EXISTS 'visitante'@'%' IDENTIFIED BY '$(printf '%s' "$MYSQL_VISITANTE_PASSWORD" | sed "s/'/''/g")';
    GRANT SELECT ON db_panela_velha.* TO 'visitante'@'%';
EOSQL
mysql_note "Usuário 'visitante' (somente leitura) criado"
