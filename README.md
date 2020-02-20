# REST API - Authentication

## Quick Start
1. Put your environment variables at .env
2. Install all dependencies and spin up the server: 
  ``` javascript
    $ npm start
  ```
  Or
  ``` javascript
    $ yarn start
  ```

### ENV Setting
Config the following variable into .env file
  ```
    DB_CONNECT = 'MongoDb connection link'
    TOKEN_SECRET = 'TOKEN SECRET'
    SESSION_SECRET = 'SESSION SECRET'
    EMAIL_LOGIN = 'Your Email Address'
    EMAIL_PASSWORD = 'Your Email Address'
  ```

## API
| Method | Endpoint | Request | Reponse |
| ------ | ------ | ----- | ------- |
| POST   | /api/register | | |
| POST   | /api/login | | |
| POST   | /api/changePassword | | |
| GET   | /api/getAllUser | | |
| POST   | /api/createUser | | |
| GET   | /api/:id/getOneUser | | |
| PUT   | /api/:id/updateUser | | |
| DELETE   | /api/:id/deleteUser | | |
| POST | /api/resetPassword/user/:email | | |

## Dependencies

#### Node.js
An open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a browser.

#### Express
A web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs.

#### MongoDB
A cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schema.

#### JSON Web Tokens
A compact URL-safe means of representing claims to be transferred between two parties. 

#### cors
Used to configure API security

#### dotenv
Load environment variables from a .env file into process.env

  
