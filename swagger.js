const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const swaggerRouter = express.Router();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description: 'A simple Express URLSORTNER API',
    },
    servers: [
      {
        url: 'http://localhost:4500/',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(options);

swaggerRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = swaggerRouter;