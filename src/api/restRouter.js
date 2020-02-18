const express = require("express");
const restRourer = express.Router();

const userRouter = require('./resources/user/user.restRouter');
const register = require('./modules/auth');

//Auth
restRourer.route('/register').post(register);
restRourer.route('/login').post(login);

//
restRourer.get('/users', userRouter)

module.exports = restRourer;