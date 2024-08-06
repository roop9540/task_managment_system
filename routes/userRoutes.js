const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authJwt } = require('../middlewares');


// router.get('/profile', (req, res)=>{
//     res.send("workinggg")
// });

router.get('/profile', [authJwt.tokenVerify],userController.getUserProfile);

module.exports = router;
