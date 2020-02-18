const express = require("express");
const router = express.Router();

const { userRouter } = require('./resources/user');

//Auth
restRourer.route('/register').post(register);
restRourer.route('/login').post(register);

export const restRourer = express.Router();

