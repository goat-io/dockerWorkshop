# Creating your Mongo Container

## Build and tag your image

```shell
docker build --tag=mymongoimage .
```

## Run your image in a container

```shell
docker run mymongoimage
```

## Can you find what is missing in our Docker RUN command? CHECK THE [DOCS](https://hub.docker.com/_/mongo)

We did not give the image the env variables that it requires. We can do that by including the -e flag.

```shell
docker run -e "MONGO_DB_USER=user" -e "MONGO_DB_PASSWORD=password" -e "MONGO_INITDB_DATABASE=app" mymongoimage
```

## Is there something else missing? 

Yes!. We need to include the PORT mapping if we want to connect from our computer to the container.
We do that including the -p flag to the docker command.

```shell
docker run -e "MONGO_DB_USER=user" -e "MONGO_DB_PASSWORD=password" -e "MONGO_INITDB_DATABASE=app"  -p 27018:27017 mymongoimage
```

## Lets keep running mongoDB
Inlcude the -d flag the leave the process running in the background

```shell
docker run -e "MONGO_DB_USER=user" -e "MONGO_DB_PASSWORD=password" -e "MONGO_INITDB_DATABASE=app" -d -p 27018:27017 mymongoimage
```

## TAG YOUR IMAGE FOR UPLOADING

```shell
docker tag mymongoimage <My-DockerHub-Username>/<image-name>:<verion/tag>
```

## Push your image to Dockerhub

```shell
docker push <My-DockerHub-Username>/<image-name>:<verion/tag>
```

## User your image wherever you want

```shell
docker run <My-DockerHub-Username>/<image-name>:<verion/tag>
```
