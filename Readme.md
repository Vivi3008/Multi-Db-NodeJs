## PosgtreSQL
docker run 
    --name postgres \ 
    -e POSTGRES_USER=viviramos \
    -e POSTGRES_PASSWORD=minhasenhasecreta \
    -e POSTGRES_DB=heroes \
    -p 5432:5432
    -d \
    postgres

docker ps (para ver as imagens)
docker exec -it postgres /bin/bash

**Criando um cliente para o banco de dados**
docker run  --name adminer -p 8080:8080 --link postgres:postgres -d adminer

## MongoDB
docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin -d mongo:4

**Criando um cliente para o banco de dados**
docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient

**Criar um novo usuário**
docker exec -it mongodb mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin \
--eval "db.getSiblingDB('herois').createUser({user:'viviRamos', pwd:'minhasenhasecreta', roles: [{role: 'readWrite', db: 'herois'}]})

**Iniciar o mongo**
docker run -d -p 3000:3000 mongoclient/mongoclient  

docker run --name mongoDb2 -p 27017:27017 -d mongo (este comando inicia um container do mongo na porta 27017)

docker rm --force mongoDb2 (parar o container)