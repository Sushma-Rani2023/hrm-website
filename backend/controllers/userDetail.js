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


const updateUser= async(req,res)=>{
    const {skills ,phoneNo,emergencyNo,address}=req.body
    const id=req.params.id
    const user=await User.findById(id);

    user.skills=skills
    user.phoneNo=phoneNo
    user.emergencyNo=emergencyNo
    user.address=address

    user.save()
    .then(result=>{
        
    res.json({
            data:result,
            message:"updated successfully",

        })
    })
    .catch(err=>{
        res.status(500).json({
            error : err,
            message : "Error Ocurred"
        })


    
    })



}

const deleteUser=(req,res)=>{
    const id=req.params.id;
    User.findByIdAndDelete(id)
    .then(result=>{
        if (!result){
            res.status(404).send({message:"Id not found"})
        }
        else{
            res.status(202).send({message:"Data deleted Successfully"})
        }
    })
    .catch(err => {
        res.status(500).send({message:"Error Occured"});
    })

}


module.exports={getUser,updateUser,deleteUser};