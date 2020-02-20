const express = require("express");
const restRourer = express.Router();

const userRouter = require('./resources/user/user.restRouter');

const {register, login, changePassword, protect} = require('./modules/auth');

//const changePassword = require('./modules/auth');

//Auth
restRourer.route('/register').post(register);
restRourer.route('/login').post(login);
restRourer.route('/changePassword').post(protect, changePassword);

//Resource
restRourer.get('/users', protect, userRouter)

module.exports = restRourer;