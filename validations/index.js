const manageValidation = require('./schema');
module.exports = {
    UserRegister: async (req, res, next) => {
        const value = await manageValidation.userRegister.validate(req.body);
        errorMessage(value, res, next);
    },
    CreateTask:async (req, res, next)=>{
        const value = await manageValidation.createTask.validate(req.body);
        errorMessage(value, res, next);
    },
    UpdateTask: async (req, res, next)=>{
        const value = await manageValidation.updateTask.validate(req.body);
        errorMessage(value, res, next);
    },
    AssignTask: async (req, res, next)=>{
        const value = await manageValidation.assignTask.validate(req.body);
        errorMessage(value, res, next);
    },
    ReAssignTaske: async (req, res, next)=>{
        const value = await manageValidation.reAssignTask.validate(req.body);
        errorMessage(value, res, next);
    }
    
    
    
};

const errorMessage = (value, res, next) => {
    if (value.error) {
        console.log("value.error",value.error)
        return res.json({
            success: false,
            message: value.error.details[0].message
        });
    } else {
        console.log("value.error No")
        next();
    }
};