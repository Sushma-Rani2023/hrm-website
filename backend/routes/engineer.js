const express = require('express');

const {engineercreate,
  getengineerinfo,
  updateengineer,
  deleteengineer} = require('../controllers/engroles');

const Router2 = express.Router();

const authentication = require('../middleware/Authentication')

Router2.post('/createengineer',authentication, engineercreate);

Router2.get('/eng' ,authentication, getengineerinfo);

Router2.get('/engineerinfo/:project_id',authentication, getengineerinfo);

Router2.get('/eng' ,authentication, getengineerinfo);

Router2.put('/updateengineer/:id' ,authentication, updateengineer);

Router2.delete('/deleteengineer/:id' ,authentication, deleteengineer);

module.exports = Router2;