const express = require("express");
const router = express.Router();

const User = require('../src/api/resources/user/user.model');

const bcrypt = require('bcryptjs');

const { registerValidation, loginValidation } = require('../middleware/validation');

const dotenv = require('dotenv');
dotenv.config();
const secret_Key = process.env.TOKEN_SECRET;

const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../middleware/passport/passport');

router.post('/register',  async (req, res) => {

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already exists
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already exists');

    //HASH passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Crate a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();

        const token = jwt.sign({_id: user._id.toString() }, secret_Key);
        return res.header('auth-token', token).send(user._id.toString());
    } catch(err) {
        res.status(400).send(err);
    }
});

//LOGIN
router.post('/login', 
    passport.authenticate('local', { session : false }),
    async (req, res) => {
        //Check User Input Format
        const { error } = loginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Email is not found');

        const token = jwt.sign({_id: user._id.toString() }, secret_Key);
        return res.header('auth-token', token).send(user._id.toString());
    }
);

//LOGOUT
router.post('/logout', (req, res) => {
    req.logout();
    return res.header('auth-token', '').send('logout');
});

//CHANGE PASSWORD
router.post('/resetpassword', async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    User.findOne({ email: email })
        .then(user => {
            if(!user) return res.status(404).send("Invaild Email")
        })
        .then(user => {
            const salt = bcrypt.genSalt(10);
            const hashedPassword = bcrypt.hash(req.body.password, salt)

            user.password = hashedPassword;
            user.save().then(user => {
                const token = jwt.sign({_id: user._id.toString() }, secret_Key);
                return res.header('auth-token', token).send(user._id.toString());
            })
                .catch(err => {
                    res.status(400).send(err);
                })
        })
});

module.exports = router;
