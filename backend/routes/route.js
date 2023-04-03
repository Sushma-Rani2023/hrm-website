const express = require('express');

const {Createproject, 
    Projectfindbycode,
    updateproject,
    deleteproject} = require('../controllers/createproject');
const authentication = require('../middleware/Authentication') 

const Router = express.Router();

Router.post('/createproject',authentication, Createproject);

Router.get('/description/' ,authentication, Projectfindbycode);



Router.put('/updateproject/:id',authentication, updateproject);

Router.delete('/deleteproject/:id' ,authentication, deleteproject);

module.exports = Router;

