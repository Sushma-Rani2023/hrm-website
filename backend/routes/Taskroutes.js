const express = require("express");

const {
  createTask,
  gettask,
  updatetask,
  deletetask,
} = require("../controllers/Task");

const authentication = require('../middleware/Authentication');

const Router4 = express.Router();

Router4.post("/createtask",authentication, createTask);

Router4.get('/taskdetails/:project_id',authentication, gettask);

Router4.get('/infotask',authentication, gettask);


Router4.put("/updatetask/:id",authentication, updatetask);

Router4.delete("/deletetask/:id",authentication, deletetask);

module.exports = Router4;
