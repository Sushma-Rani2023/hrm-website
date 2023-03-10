const ClientDetails = require('../models/Clientmodel');

const Clientinfo = (req,res) => {
    
    const Client = new ClientDetails({
        Clientname:req.body.Clientname,
        Clientcode:req.body.Clientcode,
        Clientmanager:req.body.Clientmanager,
        Currencyselector:req.body.Currencyselector,
        Billing:req.body.Billing,
        Optional:req.body.Optional,
       })
    Client.save()
    .then(result =>{
        console.log(result)
        res.status(200).json({
            newClient : result
        })
     })

     .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
     })
}

const Clientget = (req,res) => {

    if(req.query.id){
      const id = req.query.id;
      ClientDetails.findById(id)
      .then((data)=> {
        if(!data){
            res.status(404).send({message: 'Not found project with id' + id});
        }
        else{
            res.send(data)
        }
      })
      .catch(err => {
        res.status(500).send({message:'Error occured'})
      })
    }
    else{
        ClientDetails.find()
        .then(result => {
            res.status(200).json({
                ClientData : result
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
    }
   
}

const updateClient = async (req, res) => {
    const { Clientname, Clientcode, Clientmanager,Currencyselector, Billing, Optional  } = req.body;
    const id = req.params.id;
    const Updatedclient = await ClientDetails.findByIdAndUpdate(id);
  
    Updatedclient.Clientname = Clientname || Updatedclient.Clientname;
    Updatedclient.Clientcode = Clientcode || Updatedclient.Clientcode;
    Updatedclient.Clientmanager = Clientmanager || Updatedclient.Clientmanager;
    Updatedclient.Currencyselector = Currencyselector || Updatedclient.Currencyselector;
    Updatedclient.Billing = Billing || Updatedclient.Billing;
    Updatedclient.Optional = Optional || Updatedclient.Optional;
    
    Updatedclient
      .save()
      .then((data) => {
        res.json({
          message: "project is updated at mongo",
          updatedClient: data,
        });
      })
      .catch((err) => {
        res.json({
          message: err.message,
        });
      });
  };

  const deleteClient = (req, res)=> {
    const id = req.params.id;

    ClientDetails.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({message:`cannot dalete with id ${id} Maybe id is wrong`})
        }
        else{
            res.send({
                message : "Project was deleted successfully!"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message : "Could not delete Project with id " + id
        })
    })
}

module.exports = {Clientinfo, Clientget, updateClient, deleteClient};