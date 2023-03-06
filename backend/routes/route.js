const express = require('express');

const {Createproject, 
    Projectfindbycode,
    updateproject,
    deleteproject} = require('../controllers/createproject');

const Router = express.Router();

Router.post('/createproject', Createproject);

Router.get('/description/:Projectcode' , Projectfindbycode);

Router.put('/updateproject/:id', updateproject);

Router.delete('/deleteproject/:id' , deleteproject);

module.exports = Router;