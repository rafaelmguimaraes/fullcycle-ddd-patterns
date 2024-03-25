# DDD: Modelagem Tática e Patterns
### Repositório de estudo sobre Modelagem Tática e Patterns

1. Para executar o projeto localmente - modo desenvolvimento

```bash
docker compose up -d --build # para subir o container
docker compose exec node bash # para acessar o container
npm install # para instalar as dependências
npm test # para rodar os testes
```

2. Para executar o projeto localmente - execução dos testes

``` bash
docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit
```

