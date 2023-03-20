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
//const { default: App } = require('../frontend/src/App');
const app = express();
const serverless = require('serverless-http')

connectDB();


app.use(express.json({ extended: false }));

app.use(cors());

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


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
