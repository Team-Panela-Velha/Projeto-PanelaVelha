#!/usr/bin/env bash
# Altera o número de réplicas de um serviço da stack (demonstração de escala).
# Uso: infra/swarm/scale.sh backend 6
#      infra/swarm/scale.sh frontend 4
#      infra/swarm/scale.sh              (mostra os serviços e onde está cada réplica)
set -euo pipefail
. "$(dirname "$0")/_lib.sh"
exigir_cluster
STACK=panela

if [ $# -eq 0 ]; then
  docker exec "$MANAGER" docker service ls --filter "label=com.docker.stack.namespace=$STACK"
  for svc in backend frontend; do
    echo
    docker exec "$MANAGER" docker service ps "${STACK}_$svc" --filter desired-state=running \
      --format 'table {{.Name}}\t{{.Node}}\t{{.CurrentState}}'
  done
  exit 0
fi

if [ $# -ne 2 ] || ! [[ "$2" =~ ^[0-9]+$ ]]; then
  echo "Uso: $0 <backend|frontend> <réplicas>" >&2
  exit 1
fi

docker exec "$MANAGER" docker service scale --detach=false "${STACK}_$1=$2"
docker exec "$MANAGER" docker service ps "${STACK}_$1" --filter desired-state=running \
  --format 'table {{.Name}}\t{{.Node}}\t{{.CurrentState}}'
