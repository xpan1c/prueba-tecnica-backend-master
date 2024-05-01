# API implementation through lambda functions
 
This is the final task, so if you are already here congrats in advance! This task consists of the creation of a REST API using lambda functions with the severless framework. 

- Lambdas definition must be done in the file `src/serverless.yml`. An example of a sample function is already provided. 
- Lambdas implementation must be donde inside the folder `src/handlers`. Again, an example is already provided. 

## Note on the proposed architecture

Each lambda has a unique handler which is defined in `src/handlers`. Thus, business logic is not supposed to be coded directly in the handler because it wouldn't be able to reuse it. Therefore, inside the folder `src/db/managers` we created a `UserManager`.  You might need to create more managers as they are needed. The responsibility of a manager is bonded to the associated entity, i.e., the `User Manager` is in charge to create, find, update and destroy users. 

Following this criteria, create other managers as you need in order to implement the requested lambdas below. 

## Lambdas implementation

- Create company
    - Description: Creates a company with the provided params
    - Path: /put-company
    - Method: POST 

- Create user: (take a look to the example provided in `src/handlers/put-item.ts`)
    - Description: Create a user with the provided params. 
    - Path: /put-user
    - Method: POST 

- Create offering:
    - Description: Create an offering associated to a company 
    - Path: /put-offering
    - Method: POST 

- Invest
    - Description: Create an investment of an investor in an offering
    - Path: /invest
    - Method: POST 

- Get all companies
    - Description: Returns all the companies stored in the database 
    - Path: /get-all-companies
    - Method: GET 


- Get all investors
    - Description: Returns all the investors who invested in a given company 
    - Path: /get-all-investors-by-company
    - Method: GET 

### Observations 

    - Data Validation: All the handlers might perform data validation. Please include all the validations within a single file in `src/utils/validations`

    - For the sake of simplicity, no user authorization control will be implemented in this challenge. This means that all users are allowed to invoke all the lambdas. 


## Unit tests 

Take a look at the example provided in   `__tests__/unit/handlers/put-item.test.ts` and implement the corresponding test for lambdas `get-all-companies`and `put-company`. 

To run the unit test: `npm run test` - all tests must pass 


### Deliverables: 

 - Commit the code with the lambdas implementation
 - Edit the main readme and add a link to a public postman collection to test the API in localhost through `serverless-offline`
 - Commit the unit test code and add a screenshot of the output of `npm run test` in the folder `src/docs/images`  



