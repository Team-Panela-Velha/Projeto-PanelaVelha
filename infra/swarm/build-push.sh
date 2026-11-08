#!/usr/bin/env bash
# Faz o build das imagens (mysql, backend, frontend) no host e envia para o registry do cluster.
# Usa os nomes definidos no docker-compose.yml: ${REGISTRY}/panela-*:${TAG}
set -euo pipefail
. "$(dirname "$0")/_env.sh"
exigir_cluster

"$ROOT/infra/swarm/registry.sh"

if [ "$REGISTRY" != "127.0.0.1:5000" ]; then
  echo "AVISO: REGISTRY=$REGISTRY; os nós do cluster fazem pull de 127.0.0.1:5000" >&2
fi

echo "Build das imagens (tag $TAG)..."
docker compose -f "$ROOT/docker-compose.yml" --env-file "$ENV_FILE" build
echo "Enviando para $REGISTRY..."
docker compose -f "$ROOT/docker-compose.yml" --env-file "$ENV_FILE" push
echo "Imagens no registry: $(curl -s http://127.0.0.1:5000/v2/_catalog)"
