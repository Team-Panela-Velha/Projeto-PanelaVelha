# Funções comuns dos scripts de infra/swarm (carregado com: . "$(dirname "$0")/_lib.sh")
MANAGER=pv-manager-01
WORKERS=(pv-worker-01 pv-worker-02 pv-worker-03)

exigir_cluster() {
  if [ "$(docker container inspect -f '{{.State.Running}}' "$MANAGER" 2>/dev/null)" != true ]; then
    echo "ERRO: cluster não está no ar. Rode antes: infra/swarm/dind-up.sh" >&2
    exit 1
  fi
}

# Baixa uma imagem do Docker Hub dentro de um nó, com novas tentativas: vários pulls simultâneos
# no DinD às vezes falham por DNS e a tarefa do Swarm fica parada em "Preparing".
puxar_imagem() {
  local no="$1" imagem="$2"
  for tentativa in 1 2 3 4 5; do
    docker exec "$no" docker pull -q "$imagem" >/dev/null 2>&1 && return 0
    echo "  $no: falha ao baixar $imagem (tentativa $tentativa), tentando de novo..." >&2
    sleep 3
  done
  echo "ERRO: $no não conseguiu baixar $imagem (verifique a internet)" >&2
  exit 1
}
