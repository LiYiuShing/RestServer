const express = require('express');
const email = require('../email/email.controller');
const emailRouter = express.Router();

emailRouter.route('/user/:email').post(email.sendEmail);

module.exports = emailRouter;