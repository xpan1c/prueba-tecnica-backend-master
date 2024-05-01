# Models and tables implementation

Now that we have the database model designed and the local environment configured, it's time to code :D 

## Database models

Sequelize models are stored in `src/db/models`. You will find an example for an entity called "User" matching the table `users` of the database created in the [second task](./docs/BCC-03-configure-local-env.md). You might need this entity or not depending on your design, feel free to use it or drop it according to your needs. 

Deliverable: Create all the database models as typescript classes using [sequelize](https://github.com/sequelize/sequelize) and [sequelize-typescript](https://github.com/sequelize/sequelize-typescript). Types, references to other models and constraints must be included.  

## Migration script

Using the [Sequelize Query Interface](https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface), complete the //TODO in the file `src/db/migrations/01-initial-migration.ts`. 

For the `up` method, create all the tables defining the attributes to match the models defined in `src/db/models`. 
Regarding the `down` method, destroy the database as well as the enums defined. 

To run the migration script: 
`npm run migrate-local-up` and `npm run migrate-local-down`


### Deliverable: Implementation of `up` and `down` methods. 

