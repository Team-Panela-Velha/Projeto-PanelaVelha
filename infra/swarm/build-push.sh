#!/usr/bin/env bash
# Faz o build das imagens (mysql, backend, frontend) a partir dos Dockerfiles e envia para o
# registry do cluster, com os nomes usados no docker-stack.yml: ${REGISTRY}/panela-*:${TAG}
set -euo pipefail
. "$(dirname "$0")/_env.sh"
exigir_cluster

"$ROOT/infra/swarm/registry.sh"

if [ "$REGISTRY" != "127.0.0.1:5000" ]; then
  echo "AVISO: REGISTRY=$REGISTRY; os nós do cluster fazem pull de 127.0.0.1:5000" >&2
fi

# imagem  pasta com o Dockerfile
IMAGENS=(
  "panela-mysql    infra/mysql"
  "panela-backend  Server"
  "panela-frontend Client"
)

for linha in "${IMAGENS[@]}"; do
  read -r nome pasta <<<"$linha"
  echo "Build de $REGISTRY/$nome:$TAG ($pasta/Dockerfile)..."
  docker build -q -t "$REGISTRY/$nome:$TAG" "$ROOT/$pasta" >/dev/null
  echo "Enviando $nome para o registry..."
  docker push -q "$REGISTRY/$nome:$TAG" >/dev/null
done

echo "Imagens no registry: $(curl -s http://127.0.0.1:5000/v2/_catalog)"
