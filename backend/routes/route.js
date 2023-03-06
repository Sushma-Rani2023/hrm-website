const express = require('express');

const {Createproject, 
    Projectfindbycode} = require('../controllers/createproject');

const Router = express.Router();

Router.post('/createproject', Createproject);

Router.get('/description/:Projectcode' , Projectfindbycode);

module.exports = Router;