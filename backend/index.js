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
const serverless = require('serverless-http')
const authRouter = require('./middleware/passport')


connectDB();

// app.use(function(req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001/");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

app.use(cors({
  origin: process.env._fronturl
}));

app.use(express.json({ extended: false }));

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());



// const allowedOrigins = ['http://localhost:3001', 'https://nmk33dgsdl.execute-api.us-east-1.amazonaws.com'];
// app.use(cors({
//   origin: function(origin, callback) {
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// }));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env._fronturl);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// const corsOptions ={
//   origin:'*', 
//   credentials:true,           
//   optionSuccessStatus:200,
// }

// app.use(cors(corsOptions))

app.use('/login', authRouter);

app.use('/project',  Router);

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
