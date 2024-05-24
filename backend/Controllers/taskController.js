const Task = require("../models/Tasks");


module.exports.createTask = async(req,res,next)=>{
    try{
        const{title,description,dueDate,assignedTo} = req.body;
        const newTask = new Task({

            title,
            description,
            dueDate,
            status:"pending",
            manager:req.user.id,
            assignedTo
        })

        await newTask.save();
    

    res.status(201).json(newTask);}
    catch(error)
    {
    next(error);
    }
};


exports.getTasks = async (req, res, next) => {
    try {
      const tasks = await Task.find({ $or: [{ manager: req.user.id }, { assignedTo: req.user.id }] });
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  };



  exports.updateTask = async (req, res, next) => {
    try {
      const taskId = req.params.id;
      const updates = req.body;
  
      const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });
  
      
      res.json(updatedTask);
    } catch (error) {
      next(error);
    }
  };


  exports.deleteTask = async (req, res, next) => {
    try {
      const taskId = req.params.id;
      await Task.findByIdAndDelete(taskId);
  
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
  
  