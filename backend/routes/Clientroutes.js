const express = require('express');

const Router1 = express.Router();

const {Clientinfo,
     Clientget,
    updateClient,
    deleteClient} = require('../controllers/ClientDetails');

Router1.post('/info' , Clientinfo);

Router1.get('/Clientdetails', Clientget);

Router1.put('/updateclient/:id', updateClient);

Router1.delete('/deleted/:id', deleteClient);

module.exports = Router1;
