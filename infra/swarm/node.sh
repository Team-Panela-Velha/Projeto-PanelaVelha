#!/usr/bin/env bash
# Executa um comando dentro de um nó do cluster (padrão: o manager).
# Uso: infra/swarm/node.sh docker node ls
#      NODE=pv-worker-02 infra/swarm/node.sh docker ps
set -euo pipefail

NODE="${NODE:-pv-manager-01}"
TTY=()
[ -t 0 ] && [ -t 1 ] && TTY=(-it)

if [ $# -eq 0 ]; then
  set -- sh
fi

exec docker exec "${TTY[@]}" "$NODE" "$@"
