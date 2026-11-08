#!/usr/bin/env bash
# Cria os secrets (a partir do .env) e faz o deploy da stack "panela" no cluster.
# Rodar de novo atualiza a stack (ex.: depois de um build-push.sh com nova TAG).
set -euo pipefail
. "$(dirname "$0")/_env.sh"
exigir_cluster
STACK=panela

criar_secret() {
  local nome="$1" valor="$2"
  if docker exec "$MANAGER" docker secret inspect "$nome" >/dev/null 2>&1; then
    return 0   # secrets são imutáveis no Swarm; para trocar: dind-down.sh --volumes e subir de novo
  fi
  if [ -z "$valor" ]; then
    echo "ERRO: valor vazio para o secret $nome (confira o $ENV_FILE)" >&2
    exit 1
  fi
  printf '%s' "$valor" | docker exec -i "$MANAGER" docker secret create "$nome" - >/dev/null
  echo "Secret $nome criado"
}

if [ "${#PORTAINER_PASSWORD}" -lt 12 ]; then
  echo "ERRO: PORTAINER_PASSWORD precisa de pelo menos 12 caracteres (exigência do Portainer)" >&2
  exit 1
fi

criar_secret db_root_password   "$MYSQL_ROOT_PASSWORD"
criar_secret db_password        "$DB_PASSWORD"
criar_secret visitante_password "$VISITANTE_PASSWORD"
criar_secret secret_key         "$SECRET_KEY"
criar_secret portainer_password "$PORTAINER_PASSWORD"

# imagens do Docker Hub: baixadas antes, com novas tentativas (as da aplicação vêm do registry local)
echo "Baixando imagens de terceiros nos nós..."
puxar_imagem "$MANAGER" dockersamples/visualizer:latest
puxar_imagem "$MANAGER" portainer/portainer-ce:lts
for no in "$MANAGER" "${WORKERS[@]}"; do
  puxar_imagem "$no" portainer/agent:lts
done

echo "Deploy da stack $STACK..."
docker exec -i -e REGISTRY="$REGISTRY" -e TAG="$TAG" -e DB_USER="${DB_USER:-panela}" "$MANAGER" \
  docker stack deploy --detach=true --with-registry-auth -c - "$STACK" < "$ROOT/docker-stack.yml"

echo
docker exec "$MANAGER" docker service ls
cat <<MSG

Aplicação:   http://localhost:${APP_PORT:-80}
Visualizer:  http://localhost:${VISUALIZER_PORT:-8080}
Portainer:   http://localhost:${PORTAINER_PORT:-9000}  (usuário admin, senha PORTAINER_PASSWORD do .env)
As réplicas levam ~1 min para ficarem prontas (o MySQL inicializa o banco na primeira vez).
MSG
