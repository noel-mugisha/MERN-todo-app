
const taskModel = require('../models/taskModel');

// create a new task
module.exports.create_task = async (req,res) => {
    try {
        const task = await taskModel.create(req.body);
        res.status(200).json('Task added successfully')
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};

// get all task
module.exports.get_all_task = async (req,res) => {
    try {
        const allTasks = await taskModel.find({}).sort({createdAt:-1});
        res.status(200).json(allTasks);
    } catch (error) {
        res.status(500);
        res.json(error); 
    }
};

// update a task
module.exports.update_task = async (req,res) => {
    try {
        const updatedData = req.body;
        const id = req.params.id
        const updatedTask = await taskModel.findByIdAndUpdate(id,updatedData,{new:true});
        res.status(200).json(updatedTask)
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};

// delete a task
module.exports.delete_task = async (req,res) => {
    try {
        const id = req.params.id;
        const deletedTask = await taskModel.findByIdAndDelete(id);
        res.json('Task deleted!')
    } catch (error) {
        res.status(500);
        res.json(error)
    }
};
