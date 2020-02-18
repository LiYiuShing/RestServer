const express = require('express');
const userRouter = express.Router();
const userController = require('./user.controller');

userRouter
    .route("/")
    .get(getAllUsers)
    .post(createUser)

userRouter
    .route("/:id")
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = userRouter;