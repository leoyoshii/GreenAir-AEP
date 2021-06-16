# GreenAir-AEP-ADSIS5S-N-A
API da AEP do curso de ADSIS5S-N-A

## Pre-requisites

Para desenvolvimento foi utilizado: 

- Node v14.16.0 ou +
- PostgreSQL 12.5
- Yarn 1.22.5
- Npm 6.14.11

Caso erros persistirem verificar versões.

## Install


    yarn install
    ou
    npm install
    
Criar os arquivos `.env` e `.ormconfig`, possui arquivos `.example` para seguir. 

Criar o database com o nome especificado no `.ormconfig`. 

    yarn typeorm:run
    ou
    npm run typeorm:run

## Run the app
Rodar a aplicação como desenvolvimento.

    yarn dev:server
    ou
    npm run dev:server
    
# REST API

Para solicitar requisições utilizar o Insomnia. Pode importar o arquivo `Insomnia_greenair.json` para exemplos.

