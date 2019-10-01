# Running the example


## You must have Node.js install in your computer

```
https://nodejs.org/en/download/
```

## Install Dependencies

```shell
npm install
```

## Run App

This will run our app from our computer.

```shell
node .
```

## Build your image

```shell
docker build --tag=myexpress .
```

## Run your image in a container

```shell
docker run myexpress
```

## Try going inside your container!

Do a docker ps an get your container ID

```shell
docker ps
```

With you container id execute the following command

```shell
docker exec -it <container-id> bash
```

To exit your container just execute 
```shell
exit
```

## I Cant connect to mongo from my express app

Both mongo and our express apps are running in isoleted environment. If we dont want to expose MongoDB to world. We can create an internal network to connect both instances

```shell
docker network create myappnetwork
```

## Restart mongo with connecting it to the network

```shell
docker run -p 3000:3000 --network=myappnetwork --network-alias=express myexpress
```

## Try now to connect your Express app to mongo instead of 127.0.0.1

Also, lest leave the app running (-d flag)

```shell
docker run -p 3000:3000 --network=myappnetwork --network-alias=express -d myexpress
```

