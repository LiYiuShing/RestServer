const express = require('express');
const app = express();
const session = require('express-session');

const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

const connect = require('./db');

//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

//
dotenv.config();

//DB
connect();

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Midleware - passport initialize
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: 'false',
    saveUninitialized: 'false'
}));

app.use(passport.initialize())
app.use(passport.session())

//Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3000, () => console.log('Server Up and running'));