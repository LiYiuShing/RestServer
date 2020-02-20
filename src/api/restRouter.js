const express = require("express");
const restRourer = express.Router();

const userRouter = require('./resources/user/user.restRouter');
const emailRouter = require('./resources/email/email.restRouter');

const {register, login, changePassword, protect} = require('./modules/auth');


//Auth
restRourer.route('/register').post(register);
restRourer.route('/login').post(login);
restRourer.route('/changePassword').post(protect, changePassword);

//Resource
restRourer.use('/users', protect, userRouter)

//
restRourer.use('/resetPassword', emailRouter);

module.exports = restRourer;