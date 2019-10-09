# Working with KEYCLOAK

Keycloak is an open source software that gives out of the box support for SSO, Identity Management and Access Management.

In this case, we will use keycloak as our Authentication and SSO server.

## Starting Keycloak

First of all, we need to start the Keycloak service.
Keycloak required a DB to store all of the credentials and information about the users, therefore we will start both a MYSQL database and the keycloak server.

To start both services run the following command on your terminal from the MODULE-3 folder

```shell
docker-compose up -d --build keycloak mysql
```

To check if the services are running you can go ahead and run 'docker ps'

```shell

```

After a few minutes you should be able to see the login information on your localhost:8080

![Keycloak](../../imgs/keycloak.png?raw=true "Keycloak")

Now let's go and click on the Administration Console

![Keycloak Login](../../imgs/keycloakLogin.png?raw=true "Keycloak Login")

We now want to create a new Realm for our application. You can do that by going to the top left panel
![Realm](../../imgs/realm.png?raw=true "Realm")

We will call our realm "netlight". Remember to write it in lower case to have an stantard name.
![netlightrealm](../../imgs/netlightrealm.png?raw=true "netlightrealm")

The "netlight" REALM will gather all information about the users and apps for netlight. Because we are creating our first app, let's create a new Client.

![microservices](../../imgs/microservices.png?raw=true "microservices")

We will name this app "microservices" and we will set the root url to "http://kong:8000" we will explain this next.

![microapp](../../imgs/microapp.png?raw=true "microapp")

Now, because we want this client to be restricted and we want to force the user to login, we will set the "Access Type" to "confidential"

![confidential](../../imgs/confidential.png?raw=true "confidential")

Now your should get the "scret" credential to connect our KONG service to the Auth service. We can do that by clicking the Credentials Tab and writing down (COPY - PASTE) the secret... SAVE IT!!!

![secret](../../imgs/secret.png?raw=true "secret")

The last step of this stage is to create a user on this Realm so we can authenticate using those credentials.

First, go to the "Users" link on the left panel and then click "Add user"

![createUser](../../imgs/createUser.png?raw=true "createUser")

Then go ahead and enter the information for your user

![userCreation](../../imgs/userCreation.png?raw=true "userCreation")

Finally click on the "Credentials" TAB and create a new password for your user and press "Reset Password"

![credentials](../../imgs/credentials.png?raw=true "credentials")

GREAT! now you have a running Auth microservice!!! Continue to the next step of the workshop
