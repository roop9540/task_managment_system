
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The ID of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user
 *         roles:
 *           type: string
 *           enum: [user, manager, admin]
 *           description: The role of the user
 *         reportingTo:
 *           type: string
 *           description: The ID of the user's manager (if applicable)
 *       example:
 *         id: "64dcaedf5a3e4b30c4e4382a"
 *         name: "John Doe"
 *         email: "johndoe@example.com"
 *         roles: "user"
 *         reportingTo: "64dcaedf5a3e4b30c4e43829"
 *     UserRegister:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user
 *         password:
 *           type: string
 *           format: password
 *           description: The password of the user
 *         role:
 *           type: string
 *           enum: [user, manager, admin]
 *           description: The role of the user
 *         reportingTo:
 *           type: string
 *           description: The ID of the user's manager (if applicable)
 *       required:
 *         - name
 *         - email
 *         - password
 *       example:
 *         name: "John Doe"
 *         email: "johndoe@example.com"
 *         password: "Password123!"
 *         role: "user"
 *         reportingTo: "64dcaedf5a3e4b30c4e43829"
 *     UserLogin:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user
 *         password:
 *           type: string
 *           format: password
 *           description: The password of the user
 *       required:
 *         - email
 *         - password
 *       example:
 *         email: "johndoe@example.com"
 *         password: "Password123!"
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token
 *       example:
 *         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * paths:
 *   /api/auth/register:
 *     post:
 *       tags:
 *         - Auth
 *       summary: Register a new user
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRegister'
 *       responses:
 *         200:
 *           description: User registered successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         400:
 *           description: Bad request
 *         500:
 *           description: Server error
 * 
 *   /api/auth/login:
 *     post:
 *       tags:
 *         - Auth
 *       summary: Login a user
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLogin'
 *       responses:
 *         200:
 *           description: User logged in successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/AuthResponse'
 *         400:
 *           description: Invalid credentials
 *         500:
 *           description: Server error
 * 
 *   /api/auth/logout:
 *     post:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Auth
 *       summary: Logout a user
 *       responses:
 *         200:
 *           description: User logged out successfully
 *         400:
 *           description: Token is required for logout
 *         401:
 *           description: Invalid token
 *         500:
 *           description: Server error
 * 
 *   /api/users/profile:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Users
 *       summary: Get the profile of the logged-in user
 *       responses:
 *         200:
 *           description: User profile fetched successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         404:
 *           description: User not found
 *         500:
 *           description: Server error
 */





/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: The description of the task
 *         dueDate:
 *           type: string
 *           format: date
 *           description: The due date of the task
 *         priority:
 *           type: string
 *           enum: [low, medium, high]
 *           description: The priority level of the task
 *         status:
 *           type: string
 *           enum: [pending, in_progress, completed]
 *           description: The current status of the task
 *         assignedTo:
 *           type: string
 *           description: The ID of the user to whom the task is assigned
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the task
 *       required:
 *         - title
 *         - dueDate
 *         - priority
 *         - status
 *         - createdBy
 *       example:
 *         title: "Implement login feature"
 *         description: "Implement user login with JWT authentication"
 *         dueDate: "2024-08-30"
 *         priority: "high"
 *         status: "in_progress"
 *         assignedTo: "64dcaedf5a3e4b30c4e4382a"
 *         createdBy: "64dcad5e5a3e4b30c4e43827"
 *     TaskCreate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: The description of the task
 *         dueDate:
 *           type: string
 *           format: date
 *           description: The due date of the task
 *         priority:
 *           type: string
 *           enum: [low, medium, high]
 *           description: The priority level of the task
 *         status:
 *           type: string
 *           enum: [pending, in_progress, completed]
 *           description: The current status of the task
 *         assignedTo:
 *           type: string
 *           description: The ID of the user to whom the task is assigned
 *       required:
 *         - title
 *         - dueDate
 *         - priority
 *         - status
 *       example:
 *         title: "Implement login feature"
 *         description: "Implement user login with JWT authentication"
 *         dueDate: "2024-08-30"
 *         priority: "high"
 *         status: "in_progress"
 *         assignedTo: "64dcaedf5a3e4b30c4e4382a"
 *     TaskAssign:
 *       type: object
 *       properties:
 *         taskId:
 *           type: string
 *           description: The ID of the task
 *         userId:
 *           type: string
 *           description: The ID of the user to whom the task is being assigned
 *       required:
 *         - taskId
 *         - userId
 *       example:
 *         taskId: "64dcaf6b5a3e4b30c4e43832"
 *         userId: "64dcaedf5a3e4b30c4e4382a"
 *     TaskUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: The description of the task
 *         dueDate:
 *           type: string
 *           format: date
 *           description: The due date of the task
 *         priority:
 *           type: string
 *           enum: [low, medium, high]
 *           description: The priority level of the task
 *         status:
 *           type: string
 *           enum: [pending, in_progress, completed]
 *           description: The current status of the task
 *       required:
 *         - dueDate
 *       example:
 *         title: "Implement login feature"
 *         description: "Implement user login with JWT authentication"
 *         dueDate: "2024-08-30"
 *         priority: "high"
 *         status: "completed"
 * 
 * paths:
 *   /api/tasks/create-task:
 *     post:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Tasks
 *       summary: Create a new task
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskCreate'
 *       responses:
 *         200:
 *           description: Task created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Task'
 *         400:
 *           description: Bad request
 *         403:
 *           description: Access denied
 * 
 *   /api/tasks/get-tasks:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Tasks
 *       summary: Retrieve tasks based on filters
 *       parameters:
 *         - in: query
 *           name: assignedTo
 *           schema:
 *             type: string
 *           description: Filter tasks by the user they are assigned to
 *         - in: query
 *           name: priority
 *           schema:
 *             type: string
 *             enum: [low, medium, high]
 *           description: Filter tasks by priority level
 *         - in: query
 *           name: dueDate
 *           schema:
 *             type: string
 *             format: date
 *           description: Filter tasks by due date
 *         - in: query
 *           name: sort
 *           schema:
 *             type: string
 *           description: Sort tasks by specified field (e.g., createdAt, dueDate)
 *       responses:
 *         200:
 *           description: Task data fetched successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Task'
 *         400:
 *           description: Bad request
 * 
 *   /api/tasks/update-task/{id}:
 *     post:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Tasks
 *       summary: Update an existing task
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the task to update
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskUpdate'
 *       responses:
 *         200:
 *           description: Task updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Task'
 *         400:
 *           description: Bad request
 *         403:
 *           description: Access denied
 *         404:
 *           description: Task not found
 * 
 *   /api/tasks/delete-task/{id}:
 *     delete:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Tasks
 *       summary: Delete a task
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the task to delete
 *       responses:
 *         200:
 *           description: Task deleted successfully
 *         403:
 *           description: Access denied
 *         404:
 *           description: Task not found
 * 
 *   /api/tasks/assign:
 *     post:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Tasks
 *       summary: Assign a task to a user
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskAssign'
 *       responses:
 *         200:
 *           description: Task assigned successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Task'
 *         400:
 *           description: Bad request
 *         403:
 *           description: Access denied
 *         404:
 *           description: Task or User not found
 * 
 *   /api/tasks/assigned/{userId}:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Tasks
 *       summary: Get tasks assigned to a specific user
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the user whose tasks are to be retrieved
 *         - in: query
 *           name: priority
 *           schema:
 *             type: string
 *             enum: [low, medium, high]
 *           description: Filter tasks by priority level
 *         - in: query
 *           name: dueDate
 *           schema:
 *             type: string
 *             format: date
 *           description: Filter tasks by due date
 *         - in: query
 *           name: sort
 *           schema:
 *             type: string
 *           description: Sort tasks by specified field (e.g., createdAt, dueDate)
 *       responses:
 *         200:
 *           description: Tasks fetched successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Task'
 *         403:
 *           description: Access denied
 *         404:
 *           description: User not found
 * 
 *   /api/tasks/reassign:
 *     post:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Tasks
 *       summary: Reassign a task to a new user
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskAssign'
 *       responses:
 *         200:
 *           description: Task reassigned successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Task'
 *         400:
 *           description: Bad request
 *         403:
 *           description: Access denied
 *         404:
 *           description: Task or User not found
 */

