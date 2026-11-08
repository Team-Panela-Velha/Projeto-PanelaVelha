# Carregado pelos scripts de infra/swarm: raiz do repositório e variáveis do .env.
# ENV_FILE permite usar outro arquivo (padrão: .env na raiz).
. "$(dirname "${BASH_SOURCE[0]}")/_lib.sh"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ENV_FILE="${ENV_FILE:-$ROOT/.env}"

if [ ! -f "$ENV_FILE" ]; then
  echo "ERRO: $ENV_FILE não encontrado. Crie com: cp .env.example .env (e troque as senhas)" >&2
  exit 1
fi
set -a
# shellcheck disable=SC1090
. "$ENV_FILE"
set +a
REGISTRY="${REGISTRY:-127.0.0.1:5000}"
TAG="${TAG:-latest}"
