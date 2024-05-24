const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    dueDate:{
        type:Date,
        required:true
    },
    status: {
         type: String, 
         enum: ['pending', 'in-progress', 'completed'], 
         default: 'pending'
    },
    manager: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true },
  assignedTo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true }
});
module.exports = mongoose.model("Tasks",taskSchema);