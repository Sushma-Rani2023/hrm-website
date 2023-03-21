const express = require('express');

const Task = require('../models/Taskmodel');

const createTask = (req, res) => {
    const task = new Task({
        Taskname : req.body.Taskname,
        Taskstage : req.body.Taskstage,
        Taskphase : req.body.Taskphase,
        Taskmilestone : req.body.Taskmilestone,
        Billing : req.body.Billing,
        Duration : req.body.Duration,
        Assignee : req.body.Assignee
    })
    task.save()
    .then(result => {
        res.json({
            newtask : result,
            message : 'task is created successfully'
        })
    })
    .catch(err => {
        res.json({
            error: err,
            message: 'Error Occured'
        })
    })
}

const gettask = (req, res) => {
    if(req.query.id){
        const id = req.query.id;
        Task.findById(id)
        .then(result => {
           if(!result){
            res.status(404).send({message:"Task Data not found at id" + id})
           }
           else{
            res.send(result);
           }
        })
        .catch(err => {
            res.status(500).send({
                error : err,
                message:"Error Occured"})
        })
    }
    else{
        Task.find()
        .then(result => {
            res.status(200).json({
                data: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "Error Occured"
            })
        })
    }
}

const updatetask = (req,res) => {
   const {Taskname, Taskstage, Taskphase, Taskmilestone, Billing, Duration, Assignee} = req.body;
   const id = req.query.id;
   const task =  Task.findByIdAndUpdate(id);
   
   task.Taskname = Taskname || task.Taskname,
   task.Taskstage = Taskstage || task.Taskstage,
   task.Taskphase = Taskphase || task.Taskphase,
   task.Taskmilestone = Taskmilestone || task.Taskmilestone,
   task.Billing = Billing || task.Billing,
   task.Duration = Duration || task.Duration,
   task.Assignee= Assignee || task.Assignee

task
.save()
.then(result => {
    res.json({
        data : result,
        message: "Updated successfully",
    })
})
.catch(err => {
    res.status(500).json({
        error : err,
        message : "Error Ocurred"
    })
})
}


const deletetask = (req,res) => {
    const id = req.params.id;
    Task.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).json({message:"Data not found at id" + id})
        }
        else{
            res.status(200).send({message:"Deleted Task successfully"})
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Error Occured"
        })
    })
}


module.exports = {createTask, gettask, updatetask, deletetask}

