const passport = require('passport');
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const session = require('express-session');
const User = require('../models/Usermodel');
const jwt = require('jsonwebtoken');
const express = require('express');


const authRouter = express.Router();


authRouter.use(
    session({
        secret: "foo",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true,
            maxAge: 3600000, // 1 hour
        },
    })
);
authRouter.use(passport.initialize());
authRouter.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.microsoftId);
});

passport.deserializeUser((microsoftId, done) => {
    User.findOne({ microsoftId })
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err);
        });
});
const kree = process.env._clientid
console.log(kree);

const microsoftStrategy = new MicrosoftStrategy({
    clientID: process.env._clientid,
    clientSecret: process.env._clientsecreat,
    callbackURL: process.env._callbackurl,
    scope: ['user.read'],

}, 
async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    const microsoftId = profile.id;
    const existingUser = await User.findOne({ microsoftId }).lean();
    if (existingUser) {
        done(null, existingUser);
    } else {
        const newUserData = {
            fullName: profile.displayName + " " + profile.name.familyName,
            email: profile.emails[0].value,
            microsoftId: profile.id
        };

        const user = await User.create(newUserData);
        // const user = await User.findById(savedUser._id).lean();
        
        done(null, { ...user._doc});

    }
})

passport.use(microsoftStrategy);
authRouter.get('/auth/microsoft',
    passport.authenticate('microsoft', {
        prompt: 'select_account',
    }));

authRouter.get('/auth/microsoft/callback',

    passport.authenticate('microsoft', { failureRedirect: '/login' }),
    (req, res) => { 
        const user = req.user
        const userData = { userId: user._id, fullName: user.fullName, email: user.email };
        const secretKey = process.env.KEY;
        const expired = { expiresIn: '1h' };
        const token = jwt.sign(userData, secretKey, expired);
        console.log(token);
        res.cookie("token" , token )
        res.redirect('http://localhost:3001/');
    });


module.exports = authRouter;