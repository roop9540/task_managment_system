// controllers/authController.js
const { convertAndValidateDate } = require('../helpers/helperfunctions');
const Task = require('../models/Task');
const User = require('../models/User');

var TaskFunction = {
  default: async (req, res) => {
    res.status(200).json("Every things working fine in Task Controller");
  },
  createTask: async (req, res) => {
    console.log("reqq role", req.role[0])
    if (req.role[0] === 'user' || req.role[0] === 'manager' || req.role[0] === 'admin') {
      try {
        const converDateToIso = await convertAndValidateDate(req.body.dueDate);
        console.log("converDateToIso", converDateToIso);
        if (req?.body?.assignedTo) {
          const checkAssignToExist = await User.findOne({ _id: req.body.assignedTo })
          if (!checkAssignToExist) {
            return res.status(400).json({
              success: false,
              message: "AssignedTo id is not a valid id"
            });
          }
        }
        const task = {
          title: req.body.title,
          description: req.body.description,
          dueDate: converDateToIso,
          priority: req.body.priority,
          status: req.body.status,
          assignedTo: req.body.assignedTo || req.user_id,
          createdBy: req.user_id,
        };

        const savedTask = await Task.create(task);
        return res.status(200).json({
          success: true,
          message: "Task Created Successfully",
          data: savedTask
        });
      } catch (err) {
        console.error("err.message", err);
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }
    } else {
      return res.status(403).json({
        success: false,
        message: 'Access Denied'
      });
    }
  },
  getTasks: async (req, res) => {
    let filter = {};
    try {
    if (req.role[0] === 'user') {
      filter = { assignedTo: req.user_id };
    } else if (req.role[0] === 'manager') {
      filter = { createdBy: req.user_id };
    }
    if (req.query.assignedTo) {
      filter.assignedTo = req.query.assignedTo;
    }

    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

    if (req.query.dueDate) {
      // Convert the dueDate from DD-MM-YYYY format to ISO
      const isoDueDate = await convertAndValidateDate(req.query.dueDate)
      filter.dueDate = { $gte: isoDueDate }; 
    }


      const tasks = await Task.find(filter).sort(req.query.sort || 'createdAt');
      res.status(200).json({
        success: true,
        message: "Task Data Fetched",
        data: tasks
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  },
  updateTask: async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);

      if (!task) {
        return res.status(404).json({ 
          success:false,
          message: 'Task not found'
         });
      }

      if (req.role[0] === 'user' && task.assignedTo.toString() !== req.user_id) {
        return res.status(403).json({ 
          success:false,
          message: 'Access Denied' });
      }

      if (req.role[0] === 'manager' && task.createdBy.toString() !== req.user_id) {
        return res.status(403).json({ 
          success:false,
          message: 'Access Denied' });
      }

      req.body.dueDate = await convertAndValidateDate(req.body.dueDate);
      Object.assign(task, req.body);
      task.updatedAt = Date.now();

      const updatedTask = await task.save();
      res.status(200).json({
        success:true,
        message:"Task Update Successfully",
        data:updatedTask

      });
    } catch (err) {
      res.status(400).json({ 
        success:false,
        message: err.message
       });
    }
  },
  deleteTask: async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);

      if (!task) {
        return res.status(404).json({ 
          success:false,
          message: 'Task not found' });
      }

      if (
        (req.role[0] === 'user' && task.assignedTo.toString() !== req.user_id) ||
        (req.role[0] === 'manager' && task.createdBy.toString() !== req.user_id)
      ) {
        return res.status(403).json({ 
          success:false,
          message: 'Access Denied' });
      }

      await Task.deleteOne({_id:req.params.id});
      res.status(200).json({ 
        success:true,
        message: 'Task deleted' });
    } catch (err) {
      console.error("err.message", err);
      return res.status(500).json({
          success: false,
          message: err.message,
      });;
    }
  },
  assignTask: async (req, res) => {
    const { taskId, userId } = req.body;

    if (req.role === 'user') {
        return res.status(403).json({ message: 'Access Denied' });
    }

    try {
        const task = await Task.findById(taskId);
        const user = await User.findById(userId);

        if (!task) {
            return res.status(404).json({ 
              success:false,
              message: 'Task not found' });
        }

        if (!user) {
            return res.status(404).json({ 
              success:false,
              message: 'User not found' });
        }

        console.log("reqqqq/e/e", req.role)
        if (req.role[0] === 'manager') {
            const teamMembers = await User.find({ reporting_to: req.user_id });
console.log("teamMembers",teamMembers)
            if (!teamMembers.some(member => member._id.equals(userId))) {
                return res.status(403).json({ message: 'Cannot assign tasks to users outside your team' });
            }

        }

        task.assignedTo = userId;
        task.updatedAt = Date.now();
        const updatedTask = await task.save();
console.log("tassk", updatedTask)
        res.status(200).json({
          success:true,
          message: "Task Assigned Successfully",
          data:updatedTask
          
    });
    } catch (err) {
        res.status(400).json({ 
          success:false,
          message: err.message });
    }
  },
  getAssignedTasks: async (req, res) => {
    const { userId } = req.params;

    if (req.role[0] === 'user') {
      return res.status(403).json({ 
        success:false,
        message: 'Access Denied' });
    }

    try {
      let filter = { assignedTo: userId };
      if (req.query.priority) {
        filter.priority = req.query.priority;
      }
  
      if (req.query.dueDate) {
        const isoDueDate = await convertAndValidateDate(req.query.dueDate)
        filter.dueDate = { $gte: isoDueDate }; // Assuming you want tasks due on or after this date
      }
  
   
      if (req.role[0] === 'manager') {
        const teamMembers = await User.find({ reporting_to: req.user_id });
console.log("teamMembers",teamMembers)
        if (!teamMembers.some(member => member._id.equals(userId))) {
            return res.status(403).json({ 
              success:false,
              message: 'Cannot view tasks assigned to users outside your team' });
        }

    }

      const tasks = await Task.find(filter).sort(req.query.sort || 'createdAt');
      res.status(200).json({
        success:true,
        message:"Tasks Fetched Successfully",
        data:tasks});
    } catch (err) {
      res.status(400).json({ 
        success:false,
        message: err.message });
    }
  },
  updateTaskAssignment: async (req, res) => {
    const { taskId, newUserId } = req.body;

    if (req.role[0] === 'user') {
      return res.status(403).json({ 
        success:false,
        message: 'Access Denied'
       });
    }

    try {
      const task = await Task.findById(taskId);
      const newUser = await User.findById(newUserId);

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      if (!newUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (req.role[0] === 'manager') {
        const teamMembers = await User.find({ reporting_to: req.user_id });
console.log("teamMembers",teamMembers)
        if (!teamMembers.some(member => member._id.equals(newUserId))) {
            return res.status(403).json({ 
              success:false,
              message: 'Cannot reassign tasks to users outside your team' });
        }

    }


      task.assignedTo = newUserId;
      task.updatedAt = Date.now();
      const updatedTask = await task.save();

      res.status(200).json({
        success:true,
        message:"Tasks Updated Successfully",
        data: updatedTask});
    } catch (err) {
      res.status(400).json({ 
        success:false,
        message: err.message });
    }
  }





}


module.exports = TaskFunction