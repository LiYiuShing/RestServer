const express = require("express");
const restRourer = express.Router();

const userRouter = require('./resources/user/user.restRouter');

//Auth
//restRourer.route('/register').post(register);
//restRourer.route('/login').post(register);

//
restRourer.get('/users', userRouter)

module.exports = restRourer;