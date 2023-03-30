const express = require('express');

const {Createproject, 
    Projectfindbycode,
    updateproject,
    deleteproject} = require('../controllers/createproject');
const authentication = require('../middleware/Authentication') 

const Router = express.Router();

Router.post('/createproject',authentication, Createproject);

Router.get('/description/' , Projectfindbycode);



Router.put('/updateproject/:id', updateproject);

Router.delete('/deleteproject/:id' , deleteproject);

module.exports = Router;

