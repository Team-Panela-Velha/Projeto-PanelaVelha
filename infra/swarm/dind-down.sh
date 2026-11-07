#!/usr/bin/env bash
# Remove o cluster DinD. Por padrão mantém os volumes dos nós (imagens baixadas e dados do MySQL).
# Uso: infra/swarm/dind-down.sh             remove nós e rede
#      infra/swarm/dind-down.sh --volumes   também apaga os volumes pv-*-data (zera banco e imagens)
set -euo pipefail

NODES=(pv-manager-01 pv-worker-01 pv-worker-02 pv-worker-03)

for nome in "${NODES[@]}"; do
  docker rm -f "$nome" >/dev/null 2>&1 && echo "Removido $nome" || true
done

docker network rm pv-swarm >/dev/null 2>&1 && echo "Removida a rede pv-swarm" || true

if [ "${1:-}" = "--volumes" ]; then
  for nome in "${NODES[@]}"; do
    docker volume rm "$nome-data" >/dev/null 2>&1 && echo "Removido o volume $nome-data" || true
  done
fi
