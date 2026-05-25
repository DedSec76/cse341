require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const connectDB = require('./database/connect');

const app = express();
connectDB();

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "My management APIs",
        version: "1.0.0",
        description: "These APIs are used to manage personal expense data. \n\nAnd also to manage a collection of movies you enjoy."
      }
    },
    apis: ["./routes/*.js"]
}

const specs = swaggerJsdoc(options)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/', require('./routes'))

const host = process.env.HOST;
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Start the Sercer ${host}:${port}`)
})