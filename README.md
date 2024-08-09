# URL Shortener API

This project is a simple URL shortener service built with Node.js, Express.js, MongoDB, and Redis. It allows users to shorten long URLs, register and login to the service, and redirect to the original URL using the shortened link.




## Table of Contents
- [Project Structure](#project-structure)
- [Features](#features)
- [Prerequisites](#prerequistes)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoint)
- [Security](#security)
- [Deployed Link](#deployed-link)
- [Swagger Link](#swagger-link)

### Project Structure

                         url-shortener/
                            │
                            ├── config/
                            │   ├── db.js                # MongoDB connection setup
                            │   ├── redis.js             # Redis configuration
                            │
                            ├── controllers/
                            │   ├── urlController.js     # URL shortening and redirection logic
                            │   ├── userController.js    # User registration and login logic
                            │
                            ├── middleware/
                            │   ├── authenticate.js      # JWT authentication middleware
                            │
                            ├── modal/
                            │   ├── urlModel.js          # Mongoose schema for URL
                            │   ├── userModel.js         # Mongoose schema for User
                            │
                            ├── routes/
                            │   ├── urlRouter.js         # URL-related routes
                            │   ├── userRouter.js        # User-related routes
                            │
                            ├── swagger.js               # Swagger configuration
                            │
                            ├── .env                     # Environment variables
                            ├── index.js                 # Entry point for the application
                            ├── README.md                # Project documentation
                            ├── package.json             # NPM package configuration


### Features

- URL Shortening: Submit a long URL to get a shortened version.

- Custom Alias: Create custom aliases for shortened URLs.

- User Registration & Login: Secure user registration and login using JWT.

- URL Redirection: Redirect users to the original URL using the shortened link.

- Redis Caching: Utilize Redis for caching user tokens for enhanced performance.


### Prerequisites
- Node.js 
- MongoDB
- Redis
- NPM 

### Installation

1. Clone the repository:

                git clone https://github.com/manoj7654/urlshortener.git
                cd urlshortener

2. Install dependencies:

            npm install

3. Set up MongoDB and Redis:

- Ensure MongoDB and Redis are installed and running on your machine.
Create a MongoDB database and configure the connection string in the .env file.

4. Start the server:

            npm start

### Environment Variables

- Create a .env file in the root directory and add the following environment variables:


            PORT=your port number
            MONGO_URL=your database url
            key=your secret key
            JWT_SECRET=your_jwt_secret
            DEPLOYED_URL=your deployed link


### API Endpoint

`users`

#### Register

- Method : POST
- Endpoint : /register
- Request body :

                  
                  {
                    "email":"user@gmail.com",
                    "password": "user@7654"
                  }

- Response : User Registered successfully

#### Login


- Method : POST
- Endpoint : /login
- Request body :

                  
                  {
                    "email":"user@gmail.com",
                    "password": "user@7654"
                  }

- Response : Login successfully

`URL shortner`

#### short url

- Method : POST
- Endpoint : /originalUrl
- Request body :

             {
                "originalUrl": "https://www.example.com/some/long/path/to/a/page",
                "short_url": "http://localhost:4500/abc123"
            }


#### Get short url

- Method : GET
- Endpoint : /:shortenUrl
- Response : 
                   {
                    "short_url": "http://localhost:4500/abc123"
                   }


### Deployed Link
[Live](https://urlshortener-qxju.onrender.com/)


### Swagger Link
[Swagger](https://urlshortener-qxju.onrender.com/api/api-docs)