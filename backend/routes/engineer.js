const express = require('express');

const engineercreate = require('../controllers/engroles');

const Router2 = express.Router();

Router2.post('/createengineer', engineercreate);

module.exports = Router2;