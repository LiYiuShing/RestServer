const Promise = require('bluebird');

const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');

const dotenv = require('dotenv');
dotenv.config();
const secret_Key = process.env.TOKEN_SECRET;

const User = require('../../src/api/resources/user/user.model');

const checkPassword = (user, password) => bcrypt
    .compare(password, user.password)
    .then(result => result ? Promise.resolve(user) : Promise.reject(null))


passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, 
    (req, email, password, done) => {
        User.findOne({ email : email })
            .then(user => checkPassword(user, password))
            .then(user => done(null, user))
            .catch(err => done(null, false))
}));

passport.use('token', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret_Key
},(jwtPayload, done) => {
    User.findById(jwtPayload._id)
        .then(user => done(null , user))
        .catch(err => done(err))
}));
