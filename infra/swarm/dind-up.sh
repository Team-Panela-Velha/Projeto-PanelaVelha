#!/usr/bin/env bash
# Sobe o cluster Swarm de apresentação com Docker-in-Docker:
# 4 containers docker:dind (pv-manager-01, pv-worker-01..03) numa rede bridge com IPs fixos.
# Uso: infra/swarm/dind-up.sh        (rodar de novo apenas religa nós parados)
set -euo pipefail

DIND_IMAGE="${DIND_IMAGE:-docker:29-dind}"
NETWORK=pv-swarm
SUBNET=172.30.0.0/24
MANAGER=pv-manager-01
MANAGER_IP=172.30.0.10

# nó  ip  label
NODES=(
  "pv-manager-01 172.30.0.10 manager"
  "pv-worker-01  172.30.0.11 db"
  "pv-worker-02  172.30.0.12 app"
  "pv-worker-03  172.30.0.13 app"
)

# portas do host -> manager (o routing mesh do Swarm entrega para qualquer nó); lidas do .env, se existir
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ENV_FILE="${ENV_FILE:-$ROOT/.env}"
if [ -f "$ENV_FILE" ]; then set -a; . "$ENV_FILE"; set +a; fi
APP_PORT="${APP_PORT:-80}"
VISUALIZER_PORT="${VISUALIZER_PORT:-8080}"
PORTAINER_PORT="${PORTAINER_PORT:-9000}"
REGISTRY_PORT="${REGISTRY_PORT:-5000}"

no_existe() { docker container inspect "$1" >/dev/null 2>&1; }

esperar_daemon() {
  for _ in $(seq 60); do
    docker exec "$1" docker info >/dev/null 2>&1 && return 0
    sleep 1
  done
  echo "ERRO: daemon Docker de $1 não respondeu" >&2
  exit 1
}

if no_existe "$MANAGER"; then
  echo "Cluster já existe: religando nós parados..."
  for linha in "${NODES[@]}"; do
    read -r nome _ _ <<<"$linha"
    docker start "$nome" >/dev/null
  done
  for linha in "${NODES[@]}"; do
    read -r nome _ _ <<<"$linha"
    esperar_daemon "$nome"
  done
  docker exec "$MANAGER" docker node ls
  exit 0
fi

docker network inspect "$NETWORK" >/dev/null 2>&1 \
  || docker network create --subnet "$SUBNET" "$NETWORK" >/dev/null

for linha in "${NODES[@]}"; do
  read -r nome ip _ <<<"$linha"
  portas=()
  if [ "$nome" = "$MANAGER" ]; then
    portas=(-p "$APP_PORT:80" -p "$VISUALIZER_PORT:8080" -p "$PORTAINER_PORT:9000" -p "127.0.0.1:$REGISTRY_PORT:5000")
  fi
  echo "Criando $nome ($ip)..."
  # DOCKER_TLS_CERTDIR vazio + socket unix: o daemon interno não fica exposto em TCP
  docker run -d --privileged \
    --name "$nome" --hostname "$nome" \
    --network "$NETWORK" --ip "$ip" \
    -e DOCKER_TLS_CERTDIR= \
    -v "$nome-data:/var/lib/docker" \
    "${portas[@]}" \
    "$DIND_IMAGE" dockerd --host=unix:///var/run/docker.sock >/dev/null
done

for linha in "${NODES[@]}"; do
  read -r nome _ _ <<<"$linha"
  esperar_daemon "$nome"
done

# volumes mantidos pelo dind-down.sh guardam o estado do Swarm: os nós voltam sozinhos
no_swarm() { [ "$(docker exec "$1" docker info --format '{{.Swarm.LocalNodeState}}')" != inactive ]; }

if no_swarm "$MANAGER"; then
  echo "$MANAGER já é manager de um Swarm (estado recuperado do volume)"
else
  echo "Iniciando o Swarm em $MANAGER..."
  docker exec "$MANAGER" docker swarm init --advertise-addr "$MANAGER_IP" >/dev/null
fi
TOKEN=$(docker exec "$MANAGER" docker swarm join-token -q worker)

for linha in "${NODES[@]}"; do
  read -r nome _ _ <<<"$linha"
  [ "$nome" = "$MANAGER" ] && continue
  no_swarm "$nome" && continue
  echo "Adicionando $nome ao Swarm..."
  docker exec "$nome" docker swarm join --token "$TOKEN" "$MANAGER_IP:2377" >/dev/null
done

for linha in "${NODES[@]}"; do
  read -r nome _ label <<<"$linha"
  docker exec "$MANAGER" docker node update --label-add "role=$label" "$nome" >/dev/null
done

echo
docker exec "$MANAGER" docker node ls
echo
echo "Cluster pronto. Comandos no manager: infra/swarm/node.sh docker node ls"
