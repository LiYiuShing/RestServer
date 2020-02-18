const express = require("express");
const restRourer = express.Router();

const userRouter = require('./resources/user/user.restRouter');

const register = require('./modules/auth');
const login = require('./modules/auth');
const protect = require('./modules/auth');


//Auth
restRourer.route('/register').post(register);
restRourer.route('/login').post(login);

//Resource
restRourer.get('/users', protect, userRouter)

module.exports = restRourer;