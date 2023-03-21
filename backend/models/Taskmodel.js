const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
    Taskname:{
        type : String,
        unique : true
    },
    Taskstage: {
      type: String,
    },
    Taskphase: {
        type : String
    },
    Taskmilestone : {
        type : String
    },
    Billing : {
        type : String
    },
    Duration : {
        type : String
    },
    Assignee : {
         type : String
    },
    Taskicon :{
        type :  String
    },
    project_id:
    {
        type : String
    }
})

module.exports = mongoose.model("Task" , TaskSchema)