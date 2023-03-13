const express = require('express');

const {engineercreate,
  getengineerinfo,
  updateengineer} = require('../controllers/engroles');

const Router2 = express.Router();

Router2.post('/createengineer', engineercreate);

Router2.get('/engineerinfo', getengineerinfo);

Router2.put('/updateengineer' , updateengineer);

module.exports = Router2;