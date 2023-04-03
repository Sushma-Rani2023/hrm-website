const express = require('express');

const Router1 = express.Router();

const {Clientinfo,
     Clientget,
    updateClient,
    deleteClient} = require('../controllers/ClientDetails');

const authentication = require('../middleware/Authentication')

Router1.post('/info' ,authentication, Clientinfo);

Router1.get('/Clientdetails',authentication, Clientget);

Router1.put('/updateclient/:id',authentication, updateClient);

Router1.delete('/deleted/:id',authentication, deleteClient);

module.exports = Router1;
