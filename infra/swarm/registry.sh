#!/usr/bin/env bash
# Sobe o registry de imagens (registry:2) como serviço do Swarm no manager.
# Publicado em 127.0.0.1:5000: o host faz push por ele e cada nó faz pull pelo routing mesh
# no mesmo endereço (localhost dispensa configurar registry inseguro).
set -euo pipefail
. "$(dirname "$0")/_lib.sh"
exigir_cluster

if docker exec "$MANAGER" docker service inspect registry >/dev/null 2>&1; then
  echo "Registry já existe"
else
  echo "Criando o serviço registry..."
  puxar_imagem "$MANAGER" registry:2
  docker exec "$MANAGER" docker service create -q --detach=false \
    --name registry \
    --constraint node.role==manager \
    --publish 5000:5000 \
    --mount type=volume,source=registry-data,target=/var/lib/registry \
    registry:2 >/dev/null
fi

for _ in $(seq 30); do
  curl -sf http://127.0.0.1:5000/v2/ >/dev/null && { echo "Registry pronto em 127.0.0.1:5000"; exit 0; }
  sleep 1
done
echo "ERRO: registry não respondeu em 127.0.0.1:5000" >&2
exit 1
