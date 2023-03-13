const express = require('express');

const {engineercreate,
  getengineerinfo,
  updateengineer,
  deleteengineer} = require('../controllers/engroles');

const Router2 = express.Router();

Router2.post('/createengineer', engineercreate);

Router2.get('/engineerinfo', getengineerinfo);

Router2.put('/updateengineer' , updateengineer);

Router2.delete('/deleteengineer' , deleteengineer);

module.exports = Router2;