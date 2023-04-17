const express=require("express")
const getuser=require("../controllers/userDetail")

const authentication=require("../middleware/Authentication")
const Router=express.Router()
Router.get('/getuser',authentication,getuser);
module.exports=Router;