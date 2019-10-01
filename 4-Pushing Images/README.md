# Uploading Images to Docker Hub

## WHY
Dockerhub is a convinient way to share and re use your docker images. It will help us to manage our "ready to go" images or base images that we commonly use.
PLAAASE! make sure you are not uploading credentials or sensitive data into public repositories. (LIKE DOCKER HUB!)

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
