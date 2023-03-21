require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bodyparser = require('body-parser');
const Router = require('./routes/route');
const Router1 = require('./routes/Clientroutes');
const Router2 =require('./routes/engineer');
const Router4 = require('./routes/Taskroutes');
const RouterT = require('./routes/Team');
const app = express();
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const serverless = require('serverless-http')

connectDB();


app.use(express.json({ extended: false }));

app.use(cors());

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

const config = {
    saml: {
      path: '/login/callback',
      entryPoint: 'https://login.microsoftonline.com/383cc6fe-545e-4fab-8276-0c78ac6258f7/saml2',
      issuer: 'a7ce44f1-a25e-45d2-83eb-3aec6772f292',
      cert: '25821fa3-15c8-47c2-83ee-d24d6e311e9c',
      identifierFormat: null,
      signatureAlgorithm: 'sha256',
      acceptedClockSkewMs: 60 * 1000,
    },
  };

  passport.use(new SamlStrategy(config.saml, (profile, done) => {
    console.log('SAML profile:', profile);
    return done(null, profile);
  }));
  
  app.get('/login', passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }), (req, res) => {
    console.log('SAML login successful');
    res.redirect('/');
  });
  
  app.post(config.saml.path, passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }), (req, res) => {
    console.log('SAML callback successful');
    res.redirect('/');
  });
  
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });


app.use('/project',Router);

app.use('/Client',Router1);

app.use('/engineer', Router2);

app.use('/task',Router4);

app.use('/Team',RouterT);

module.exports.handler = serverless(app);

 //module.exports = handler



/* const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
}); */
