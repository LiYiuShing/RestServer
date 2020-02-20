const express = require('express');
const email = require('../email/email.controller');
const emailRouter = express.Router();

emailRouter.route('/user/:email').post(email.sendEmail);
emailRouter.route('/:userId/:token').post(email.setNewPassword);
//emailRouter.route('/:userId/:token').post(()=> {console.log("sd")});

module.exports = emailRouter;