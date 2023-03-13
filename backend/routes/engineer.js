const express = require('express');

const {engineercreate,
  getengineerinfo,
  updateengineer,
  deleteengineer} = require('../controllers/engroles');

const Router2 = express.Router();

Router2.post('/createengineer', engineercreate);

Router2.get('/engineerinfo', getengineerinfo);

Router2.put('/updateengineer/:id' , updateengineer);

Router2.delete('/deleteengineer/:id' , deleteengineer);

module.exports = Router2;