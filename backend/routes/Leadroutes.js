const express = require('express');
//const upload = require('../middleware/filemuler')
const {createlead,getleadinfo,deletelead,updatelead,importuser,upload} = require('../controllers/Lead');
const authentication = require('../middleware/Authentication') 
const sendEMail = require("../controllers/Sendmail")
const Router = express.Router();

Router.post('/createlead',authentication, createlead);

Router.get("/getleadinfo",authentication,getleadinfo)

Router.post("/upload",authentication,upload)
Router.post("/render",authentication,importuser)

Router.put('/updatelead/:id',authentication, updatelead);
Router.post('/send', authentication,sendEMail)

Router.delete('/deletelead/:id' ,authentication, deletelead);

module.exports = Router;

