const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authJwt } = require('../middlewares');
const validations = require("../validations")

// const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

// router.post('/', verifyToken, taskController.createTask);
// router.get('/', verifyToken, taskController.getTasks);
// router.put('/:id', verifyToken, taskController.updateTask);
// router.delete('/:id', verifyToken, taskController.deleteTask);


router.post('/create-task',[validations.CreateTask , authJwt.tokenVerify], taskController.createTask);
router.get('/get-tasks',[authJwt.tokenVerify], taskController.getTasks);
router.post('/update-task/:id',[validations.CreateTask , authJwt.tokenVerify], taskController.updateTask);
router.delete('/delete-task/:id',[authJwt.tokenVerify], taskController.deleteTask);
router.post('/assign', [validations.AssignTask , authJwt.tokenVerify], taskController.assignTask);

// // View assigned tasks
router.get('/assigned/:userId',[authJwt.tokenVerify], taskController.getAssignedTasks);
router.post('/reassign', [validations.ReAssignTaske , authJwt.tokenVerify], taskController.updateTaskAssignment);



// // Update task assignment
// router.put('/tasks/reassign', authenticate, taskController.updateTaskAssignment);
// router.post('/tasks', authenticate, taskController.createTask);
// router.get('/tasks', authenticate, taskController.getTasks);
// router.put('/tasks/:id', authenticate, taskController.updateTask);
// router.delete('/tasks/:id', authenticate, taskController.deleteTask);

module.exports = router;
