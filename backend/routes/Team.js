const express = require('express')

const {createMember, getTeam, updateTeam, deleteTeammember} = require('../controllers/Teammemb');

const authentication = require('../middleware/Authentication');


const RouterT = express.Router();

RouterT.post('/createTeam',authentication, createMember);

RouterT.get('/info/:project_id',authentication, getTeam);

RouterT.put('/updateTeam/:id',authentication, updateTeam);

RouterT.delete('/deleted/:id',authentication, deleteTeammember);

module.exports = RouterT;