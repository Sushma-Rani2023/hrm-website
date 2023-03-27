require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bodyparser = require('body-parser');
const Router = require('./routes/route');
const Router1 = require('./routes/Clientroutes');
const Router2 = require('./routes/engineer');
const Router4 = require('./routes/Taskroutes');
const RouterT = require('./routes/Team');
const app = express();
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const session = require('express-session');
const serverless = require('serverless-http')


connectDB();

app.use(express.json({ extended: false }));

app.use(cors());

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


app.use(
  cors({
    origin: "https://login.microsoftonline.com",
    credentials: true,
  })
);

// Configure session management

app.use(
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
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new SamlStrategy(
    {
      entryPoint:"https://login.microsoftonline.com/383cc6fe-545e-4fab-8276-0c78ac6258f7/saml2",
      issuer: "a7ce44f1-a25e-45d2-83eb-3aec6772f292",
      cert: "-----BEGIN PUBLIC KEY----- MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkuHF+O5SlXegIQrhwOEF lMYmpo3j+xTG2Md7zIcBp3HMPuWavq3Bwi7o9A0NI7tjBUldM8XZVQh2JgNpz65I nA4NKd4/t8r+paUV2D2Pq4QGo9zeozFQMbO6JcWSk+3JfAmWO49P0K4ZUAntNzaD /2S8t6mqjNCzLMNTvZdobiUAP1rPvhKyXHN1WyyzEfMdJMi5wvnXJH88UzQlojg7 j4OjvxYGSTBh90bGIUxRJt7opJrV2iaXMrfOXQ6R8ziZTDFgVckNHqFW8KWU9i4S Gn+iN5l4s0ph3PvIe97xyGa4mNLRt865dFsuZ5hA/i0vsOIZStEvj+n7n+7r79ca XQIDAQAB -----END PUBLIC KEY-----",
      callbackUrl: "http://localhost:3000/sso/callback",
    },
    (profile, done) => {
      // Handle user authentication and authorization
      // Create a user object with the extracted details
      return done(null, user);
    }
  )
);




passport.serializeUser((user, done) => {
  done(null, user);
});


passport.deserializeUser((user, done) => {
  done(null, user);
});


app.get(
  "/login",
  passport.authenticate("saml"),
);


app.post('/sso/callback', (req, res) => {
  res.redirect('http://localhost:3001');
});



app.use('/project', Router);

app.use('/Client', Router1);

app.use('/engineer', Router2);

app.use('/task', Router4);

app.use('/Team', RouterT);

module.exports.handler = serverless(app);

 //module.exports = handler



/* const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
}); */
