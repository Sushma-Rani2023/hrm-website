const User=require("../models/Usermodel");

const getUser=(req,res)=>{

    
        User.find()
        .then(result=>{
            res.status(200).send({
                userdata:result
            })
        })
        .catch(err=>{
            res.status(500).send({
                error:err,
                message:"Error Occured"

            })
        })
    }





module.exports=getUser;