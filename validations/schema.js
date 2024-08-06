const joi = require('joi');
const schema = {
  userRegister: joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string()
    .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$'))
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one letter, one number, one special character, and be at least 6 characters long.',
    }),
   role: joi.string().valid('user', 'admin', 'manager').default('user'),
   reportingTo:joi.string().optional()
   .messages({
       'string.base': `"assignedTo" should be a valid ID`
   })
  }),
  createTask:joi.object({
    title: joi.string().min(3).max(100).required()
        .messages({
            'string.base': `"title" should be a type of 'text'`,
            'string.empty': `"title" cannot be an empty field`,
            'string.min': `"title" should have a minimum length of {#limit}`,
            'string.max': `"title" should have a maximum length of {#limit}`,
            'any.required': `"title" is a required field`
        }),
    description: joi.string().max(500).optional()
        .messages({
            'string.base': `"description" should be a type of 'text'`,
            'string.max': `"description" should have a maximum length of {#limit}`
        }),
    dueDate: joi.string().pattern(/^\d{2}-\d{2}-\d{4}$/).required(),
    priority: joi.string().valid('low', 'medium', 'high').required()
        .messages({
            'any.only': `"priority" should be one of ['low', 'medium', 'high']`,
            'any.required': `"priority" is a required field`
        }),
    status: joi.string().valid('pending', 'in progress', 'completed', 'backlog').required()
        .messages({
            'any.only': `"status" should be one of ['pending', 'in progress', 'completed']`,
            'any.required': `"status" is a required field`
        }),
    assignedTo: joi.string().optional()
        .messages({
            'string.base': `"assignedTo" should be a valid user ID`
        })
   
  }),
  updateTask:joi.object({
    title: joi.string().min(3).max(100).optional()
        .messages({
            'string.base': `"title" should be a type of 'text'`,
            'string.empty': `"title" cannot be an empty field`,
            'string.min': `"title" should have a minimum length of {#limit}`,
            'string.max': `"title" should have a maximum length of {#limit}`,
            'any.required': `"title" is a required field`
        }),
    description: joi.string().max(500).optional()
        .messages({
            'string.base': `"description" should be a type of 'text'`,
            'string.max': `"description" should have a maximum length of {#limit}`
        }),
    dueDate: joi.string().pattern(/^\d{2}-\d{2}-\d{4}$/).optional(),
    priority: joi.string().valid('low', 'medium', 'high').optional()
        .messages({
            'any.only': `"priority" should be one of ['low', 'medium', 'high']`,
            'any.required': `"priority" is a required field`
        }),
    status: joi.string().valid('pending', 'in progress', 'completed', 'backlog').optional()
        .messages({
            'any.only': `"status" should be one of ['pending', 'in progress', 'completed']`,
            'any.required': `"status" is a required field`
        }),
    assignedTo: joi.string().optional()
        .messages({
            'string.base': `"assignedTo" should be a valid user ID`
        })
   
  }),
  assignTask:joi.object({
    taskId:joi.string().required(), 
    userId:joi.string().required()
  }),
  reAssignTask:joi.object({
    taskId:joi.string().required(), 
    newUserId:joi.string().required()
  })

  
};

module.exports = schema;