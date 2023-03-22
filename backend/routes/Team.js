const express = require('express')

const {createMember, getTeam, updateTeam, deleteTeammember} = require('../controllers/Teammemb');


const RouterT = express.Router();

RouterT.post('/createTeam', createMember);

RouterT.get('/info/:project_id', getTeam);

RouterT.put('/updateTeam/:id', updateTeam);

RouterT.delete('/deleted/:id', deleteTeammember);

module.exports = RouterT;