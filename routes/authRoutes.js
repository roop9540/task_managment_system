const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validations = require("../validations")


// router.get("/check", (req, res)=>{
//     res.send("Checking")
// })
router.post('/register',[validations.UserRegister], authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
