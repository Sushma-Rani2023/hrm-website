const express=require("express")
const {getUser}=require("../controllers/userDetail")
const {updateUser} =require("../controllers/userDetail")
const {deleteUser}=require("../controllers/userDetail")
const authentication=require("../middleware/Authentication")
const Router=express.Router()
Router.get('/getuser',authentication,getUser);
Router.put("/updateuser/:id",authentication,updateUser)
Router.delete("/deleteuser/:id",authentication,deleteUser)
module.exports = Router;