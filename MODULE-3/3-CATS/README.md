# Adding a new endpoint to Kong

If you made it this far it means that you have

- A running Keycloak installation
- A new Realm and Client
- A working Kong installation with 2 services. 1 with auth 1 without

## Your time to shine

Now its your turn.
Using the random cat API

```api
https://api.thecatapi.com/v1/images/search?format=json
```

Create a new Kong service to expose this service from our localhost using Authentication
