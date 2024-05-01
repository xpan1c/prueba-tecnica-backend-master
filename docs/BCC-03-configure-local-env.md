### Local development environment configuration

# Pre requisites


- Node.js - [Install Node.js 18.14.0](https://nodejs.org/en/), including the npm package management tool.
- Node version manager - [Install nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) 
- LibPq installed locally (installation depends on OS, `libpq-dev` for Ubuntu) [Postgress docs on libpq](https://www.postgresql.org/docs/9.5/libpq.html)
- Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community).
- Make sure you can run docker [without sudo privileges](https://docs.docker.com/engine/install/linux-postinstall/).
- Docker compose [Docker Compose](https://docs.docker.com/compose/install/).

# Install dependencies


```
nvm use
```

```
npm install
```

# Run locally

On a shell spin up a local database

```
docker-compose up -d
```

If it warns of an existing running container, take its PID, run `docker stop <PID>` and `docker rm <PID>` first. Then re run the above command.

Finally, spin up serverless offline environment

```
npm run serverless:local
```


To stop the database exit from running docker instance and type

```
docker-compose down
```

# Database migrations

Updates on the database will be managed through umzug migrations. To this aim, two scripts are available in the `package.json`: 

- migrate-local-up:  Applies all the pending migration available in the folder `src/db/migrations`
- migrate-local-down: Revert all the applied migrations

To understand how umzug migrations work please check the [available documentation](https://github.com/sequelize/umzug). The `src/umzug.json`file will be used to store the array of executed migrations. 


# Unit tests

- To run the unit tests:

```
npm run test
```


### Deliverable: Just commit the package-lock.json when you have everything working locally


