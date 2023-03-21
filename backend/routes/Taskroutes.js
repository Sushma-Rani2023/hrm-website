const express = require('express');

const {createTask,
     gettask,
    updatetask,
deletetask} = require('../controllers/Task');

const Router4 = express.Router();

Router4.post('/createtask' , createTask);

Router4.get('/taskdetails', gettask);

Router4.put('/updatetask/:id' , updatetask);

Router4.delete('/deletetask/:id', deletetask);

module.exports = Router4;