const express = require('express');

const CreateProject = require('../controllers/createproject');

const Router = express.Router();

Router.post('/createproject', CreateProject);

module.exports = Router;