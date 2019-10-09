# Working with KONG

Kong will serve as our API gateway. It will be the only service that we will "expose" to the machine as we will access kong to enter the other services.

## Configuring our machine

Because Keycloak and Kong are inside our local machine but running on docker, they communicate with each other using the docker network that we created "netlight". Sadly we cannot access this network from our local one, but there is a trick that we can do to avoid changing the network type.

To do this we will need to change the hosts file on our development computer. Go ahead and open the /etc/hosts and add the following line. You will need to access as admin so...

```shell
sudo vi /etc/hosts
```

If you are using windows, just edit the hosts file located under using your favorite editor

```mark
c:\Windows\System32\Drivers\etc\hosts
```

Add this line!

```host
127.0.0.1       keycloak
```

![hostsFile](../../imgs/hostsFile.png?raw=true "hostsFile")

Then just save your hosts files

## Configuring KONG

After doing this, is time to start the KONG service.

```shell
docker-compose up -d --build kong
```

Now if you visit "http://127.0.0.1:8001/". Your should see Kong up and running

![kongRunning](../../imgs/kongRunning.png?raw=true "kongRunning")

We will first check our first service yesno.wtf. If you now visit 'http://127.0.0.1:8000/ouryesno' you will be able to access the yesno API using our local KONG....AWESOMEEE!! =)

## Adding some authentication to it

Now we are going to create a new service for the same API but using the authentication plugin.
To do this, please replace all your configuration in your kong.yml with the following and restart the Kong service.

### How do I rebuild and restart the Kong service?

Just run the up command again

```shell
docker-compose up -d --build kong
```

You will also need to change the keycloak secret for your client. Remember the secret that you were supposed to keep from the previous module? Well...it s time to use it.

Modify the "client_secret" key under yesnoServiceAuth plugins.name.config

![kongsecret](../../imgs/kongsecret.png?raw=true "kongsecret")

```yml
_format_version: "1.1"
services:
  - name: yesnoService
    url: https://yesno.wtf/api
    tags:
      - yesNo
      - service1
    routes:
      - name: yesnoService
        strip_path: true
        preserve_host: false
        paths:
          - /ouryesno
        methods:
          - GET
        protocols:
          - http
          - https
  - name: yesnoServiceAuth
    url: https://yesno.wtf/api
    tags:
      - yesNo
      - service1
    plugins:
      - name: oidc
        config:
          client_id: microservices
          client_secret: 1ed9fa79-09a9-43c4-9528-bd5fc4864356
          discovery: http://keycloak:8080/auth/realms/netlight/.well-known/openid-configuration
          access_token_header_name: x-jwt-token
          access_token_header_as_bearer: "yes"
          disable_userinfo_header: "no"
          disable_id_token_header: "no"
    routes:
      - name: yesnoServiceAuth
        strip_path: true
        preserve_host: false
        paths:
          - /ouryesnoAuth
        methods:
          - GET
        protocols:
          - http
          - https
```

Now if you access '127.0.0.1:8000/ouryesnoAuth' you will be redirected the the Keycloak login page

![apilogin](../../imgs/apilogin.png?raw=true "apilogin")
