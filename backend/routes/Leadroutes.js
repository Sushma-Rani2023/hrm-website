const express = require('express');
const upload = require('../middleware/filemuler')
const {createlead,getleadinfo,deletelead,updatelead,importuser,download} = require('../controllers/Lead');
const authentication = require('../middleware/Authentication') 

const Router = express.Router();

Router.post('/createlead',authentication, createlead);

Router.get("/getleadinfo",authentication,getleadinfo)

Router.post("/upload",upload.single('file'),importuser)

Router.put('/updatelead/:id',authentication, updatelead);
Router.get('/download',authentication,download)

Router.delete('/deletelead/:id' ,authentication, deletelead);

module.exports = Router;

