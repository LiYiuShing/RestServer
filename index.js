const express = require('express');
const app = express();

const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const connect = require('./db');

//Import Routes
const restRoute = require('./src/api/restRouter');

//
dotenv.config();

//DB
connect();

//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Route Middleware
app.use('/api', restRoute);

app.listen(3000, () => console.log('Server Up and running'));