## Overview
 
The root of the docker-compose file is used to build the entire project. The root of the project contain two folder for the frontend and the api. The project can be built using docker or sun separately from respective directories. The .example.env files need to be copied as .env and values given accordingly

### Installation

step 1: ```copy .env.example from root folder and api folder to create 2 .env files in ./api and root folder and change the values of the variables as mentioned in the example.env file```

step 2: ```docker-compose up -d``` from root directory

you can then access the website on `http://localhost:3000/register` 

there are additional notes on [website](https://github.com/learnerdilip/cobbleweb-server-assignment/tree/main/website) and [api](https://github.com/learnerdilip/cobbleweb-server-assignment/tree/main/api) in their respective README files

### Tech used

```
FRONTEND:
* React (create-react-app) to setup the project
* Typescript for types
* Tailwind classes for styling 
* react-hook-form for handling the form in register form
* react-router-dom for handling routing
* axios to make http calls to the backend
* using react contextAPI to handle global state
```


```
BACKEND:
* nestjs as framework for the express project
* Typescript
* multer to handle file uploads
* typeorm to talk to database
* class-validator to validate data
```

```DATABASE: postgres```

```DOCKER to build the entire project at once```

NOTE: The assignement is done as part of Cobbleweb recruitment