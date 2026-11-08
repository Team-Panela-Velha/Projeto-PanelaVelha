# Projeto Panela Velha
  <html>
    <head></head>
            <body>
              <p align="center">
                <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"> 
                <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54">
                <img src="https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white">
                <img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white">
                <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white">
                <img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white">
              </p>  
            </body>

  - [Descrição](#descrição)
  - [Instruções](#instruções)
  - [Arquitetura com Docker](#arquitetura-com-docker)
  - [Roteiro de demonstração](#roteiro-de-demonstração)
  - [Desenvolvedores](#desenvolvedores)
  - [Ferramentas Utilizadas](#tecnologias-utilizadas)

# Descrição
O **Panela Velha** é um projeto semestral desenvolvido na disciplina de **Desenvolvimento Web Front-End** do curso de **Análise e Desenvolvimento de Sistemas** do **IFSP**. Este website foi projetado para ser um ponto de encontro para os apaixonados por culinária, oferecendo um espaço interativo para compartilhar e explorar receitas.
Os principais recursos incluem:

   - **Explorar receitas**: Navegue por receitas postadas pela comunidade.
   - **Cadastro de usuários**: Crie uma conta para gerenciar suas receitas favoritas.
   - **Envio de receitas**: Contribua com suas próprias receitas, detalhando:
       - Descrição;
       - Dificuldade;
       - Tempo de preparo;
       - Quantidade de porções.

O site utiliza uma arquitetura moderna, combinando **React** no front-end, **Flask** no back-end e **MySQL** como banco de dados, com toda a infraestrutura em containers **Docker**, orquestrada por **Docker Swarm**.

# Instruções
O projeto roda em um **cluster Docker Swarm** de 4 nós simulados com **Docker-in-Docker** (quatro containers `docker:dind`).
Pré-requisito: [Docker](https://docs.docker.com/engine/install/). Antes de tudo, crie o arquivo de configuração na raiz e troque as senhas:

```bash
cp .env.example .env
```

Depois, suba o cluster e a aplicação:
```bash
infra/swarm/dind-up.sh      # cria pv-manager-01 e pv-worker-01..03 e monta o Swarm
infra/swarm/build-push.sh   # sobe o registry, faz o build dos Dockerfiles e envia as imagens
infra/swarm/deploy.sh       # cria os secrets e faz o deploy da stack (docker-stack.yml)
```
  - Aplicação: http://localhost
  - Docker Visualizer: http://localhost:8080
  - Portainer: http://localhost:9000 (usuário `admin`, senha `PORTAINER_PASSWORD` do `.env`)
  - Escalar: `infra/swarm/scale.sh backend 6` (sem argumentos mostra as réplicas por nó)
  - Comandos no manager: `infra/swarm/node.sh docker service ls`
  - Desligar: `infra/swarm/dind-down.sh` (mantém dados) ou `infra/swarm/dind-down.sh --volumes` (apaga tudo)
  - Religar depois de desligar o PC/Docker: `infra/swarm/dind-up.sh` (o Swarm leva ~2 min para reorganizar os serviços)

### Desenvolvimento sem Docker (para programar)
**Servidor (Back-End):** requer um MySQL local com o banco criado pelos scripts de `infra/mysql/init/`.
  - Acesse a pasta Server pelo terminal.
  - Crie o ambiente virtual: python -m venv venv
  - Ative o ambiente virtual:
      - Windows: .\venv\Scripts\activate
      - Linux/MacOS: source venv/bin/activate
  - Instale as dependências: pip install -r requirements.txt
  - Crie o arquivo de configuração: copie `Server/.env.example` para `Server/.env` e informe a senha do seu MySQL
  - Inicie o servidor Flask: python app.py

**Cliente (Front-End):**
  - Acesse a pasta Client pelo terminal.
  - Instale as dependências do projeto: npm install
  - Inicie o ambiente de desenvolvimento: npm run dev (o Vite repassa `/api` para o Flask em `127.0.0.1:5000`)
  - Abra seu navegador e vá para o endereço indicado no terminal.

# Arquitetura com Docker
| Serviço | Imagem | Função |
|---|---|---|
| `frontend` | `Client/Dockerfile` (build Vite → Nginx) | Serve o React e repassa `/api` para o backend |
| `backend` | `Server/Dockerfile` (Python + Gunicorn) | API Flask |
| `mysql` | `infra/mysql/Dockerfile` (MySQL 8.4) | Banco com schema, dados, views, triggers e procedures embutidos |
| `visualizer` | `dockersamples/visualizer` | Representação gráfica dos containers por nó |
| `portainer` + `portainer-agent` | `portainer/portainer-ce`, `portainer/agent` | Gerenciamento do Swarm pela interface |
| `registry` | `registry:2` | Registry local de onde os nós baixam as imagens da aplicação |

Nós do cluster (definidos em `infra/swarm/dind-up.sh`):

| Nó | IP | Label | Serviços |
|---|---|---|---|
| `pv-manager-01` | 172.30.0.10 | `role=manager` | visualizer, portainer, registry |
| `pv-worker-01` | 172.30.0.11 | `role=db` | mysql |
| `pv-worker-02` | 172.30.0.12 | `role=app` | backend, frontend |
| `pv-worker-03` | 172.30.0.13 | `role=app` | backend, frontend |

  - Só o manager publica portas no host; o *routing mesh* do Swarm entrega cada requisição a uma réplica em qualquer nó.
  - Senhas e chave JWT são **Docker secrets** criados a partir do `.env` (nada de senha no código).
  - Backend e frontend fazem *rolling update* (uma réplica por vez, a nova sobe antes da antiga sair) com rollback automático.

# Roteiro de demonstração
1. `infra/swarm/dind-up.sh`, `infra/swarm/build-push.sh` e `infra/swarm/deploy.sh`; abrir o Visualizer (http://localhost:8080), o Portainer (http://localhost:9000) e a aplicação (http://localhost).
2. Aumentar as réplicas: `infra/swarm/scale.sh backend 6` → as novas réplicas aparecem no Visualizer, distribuídas entre `pv-worker-02` e `pv-worker-03`.
3. Reduzir: `infra/swarm/scale.sh backend 3`.
4. Simular manutenção de um nó: `infra/swarm/node.sh docker node update --availability drain pv-worker-02` → os containers migram para `pv-worker-03` e a aplicação continua no ar.
5. Devolver o nó: `infra/swarm/node.sh docker node update --availability active pv-worker-02`.
6. Atualização sem parar a aplicação: `infra/swarm/node.sh docker service update --force panela_backend` → as réplicas são trocadas uma a uma.

# Desenvolvedores

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/JoYoneyama">
        <img src="https://img.shields.io/badge/JoYoneyama-github?style=flat&logo=github&logoColor=white&label=github&labelColor=gray&color=blue" alt="JoYoneyama GitHub">
      </a><br />
      <sub><b>João Vitor Yoneyama</b></sub><br />
    </td>
    <td align="center">
      <a href="https://github.com/KaykyMatos845">
        <img src="https://img.shields.io/badge/github-KaykyMatos845-blue?style=plastic&logo=github&logoColor=white&labelColor=gray&color=blue" alt="KaykyMatos845 GitHub">
      </a><br />
      <sub><b>Kayky Matos</b></sub><br />
    </td>
    <td align="center">
      <a href="https://github.com/Moscofian">
        <img src="https://img.shields.io/badge/Moscofian-github?style=flat&logo=github&logoColor=white&label=github&labelColor=gray&color=blue" alt="Moscofian GitHub">
      </a><br />
      <sub><b>Lucas Moscofian</b></sub><br />
    </td>
    <td align="center">
      <a href="https://github.com/Mathlps">
        <img src="https://img.shields.io/badge/github-Mathlps-blue?style=plastic&logo=github&logoColor=white&labelColor=gray&color=blue" alt="Mathlps GitHub">
      </a><br />
      <sub><b>Matheus Lopes</b></sub><br />
    </td>
    <td align="center">
      <a href="https://github.com/PaulingCavalcante">
        <img src="https://img.shields.io/badge/github-PaulingCavalcante-blue?style=plastic&logo=github&logoColor=white&labelColor=gray&color=blue" alt="PaulingCavalcante GitHub">
      </a><br />
      <sub><b>Paulo Cavalcante</b></sub><br />
    </td>
  </tr>
</table>

# Tecnologias Utilizadas
<table align="left">
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" width= "685px" heigth="30px"> <th><p align="justify">React é uma biblioteca JavaScript para a construção de interfaces de usuário. Ele utiliza um modelo baseado em componentes, permitindo que o desenvolvedor divida a interface em partes reutilizáveis e mantenha um código organizado e escalável. Com o uso do Virtual DOM, React oferece alta performance e uma experiência fluida ao usuário. É amplamente utilizado em aplicações modernas devido à sua flexibilidade e integração com outras tecnologias.</p></th>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" width= "685px" heigth="30px"> <th><p align="justify">Python é uma linguagem de programação de alto nível conhecida por sua sintaxe clara e facilidade de aprendizado. Ela é amplamente utilizada no desenvolvimento web devido à sua eficiência em processar dados e realizar tarefas complexas com poucas linhas de código. Sua popularidade também se deve à vasta biblioteca de pacotes e à facilidade de integração com bancos de dados e frameworks, como Flask.</p></th>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white" width= "685px" heigth="30px"> <th><p align="justify">Flask é um microframework web leve e flexível para Python, projetado para criar APIs e aplicações web de maneira rápida e eficiente. Ele segue a filosofia "micro" ao fornecer apenas as ferramentas essenciais, permitindo ao desenvolvedor escolher as bibliotecas e extensões que melhor atendem às necessidades do projeto. Flask é ideal para projetos como o Panela Velha, devido à sua simplicidade e capacidade de lidar com rotas, processamento de dados e comunicação com o front-end.</p></th>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white" width= "685px" heigth="30px"> <th><p align="justify">MySQL é um sistema gerenciador de banco de dados relacional de código aberto, amplamente utilizado em aplicações web. No Panela Velha ele armazena usuários, receitas, categorias, favoritos e avaliações, e também concentra regras no próprio banco por meio de views, triggers, functions e procedures, como o histórico de alterações e a média das avaliações de cada receita.</p></th>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" width= "685px" heigth="30px"> <th><p align="justify">Docker é uma plataforma de containers que empacota cada serviço com tudo o que ele precisa para rodar, garantindo o mesmo comportamento em qualquer máquina. O Panela Velha tem uma imagem para cada serviço (front-end, back-end e banco), descreve toda a infraestrutura como código em um arquivo no formato Docker Compose (docker-stack.yml) e usa o Docker Swarm para distribuir os serviços em um cluster, com réplicas, balanceamento de carga e atualização sem interrupção.</p></th>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white" width= "685px" heigth="30px"> <th><p align="justify">Nginx é um servidor web de alto desempenho. No projeto ele entrega os arquivos do React já compilados e funciona como proxy reverso, repassando as requisições da API para as réplicas do back-end, o que permite servir toda a aplicação por uma única porta.</p></th>
    </td>
  </tr>
 </table>
