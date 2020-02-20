const express = require('express');
const userRouter = express.Router();
const userController = require('./user.controller');

userRouter
    .route("/")
    .get(userController.getAllUsers)
    .post(userController.createUser)

userRouter
    .route("/:id")
    .get(userController.getOneUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = userRouter;