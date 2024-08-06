// controllers/authController.js
const User = require('../models/User');

var UserFunction = {
    default: async (req, res) => {
        res.status(200).json("Every things working fine in User Controller");
    },
    getUserProfile: async (req, res) => {

        try {
            console.log("req.email", req.email);
            const user = await User.findOne({email:req.email});
    
            console.log("user", user);
    
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found, unauthorized access",
                });
            }
    
            return res.status(200).json({
                success: true,
                message: "User fetched successfully",
                data: user,
            });
    
        } catch (err) {
            console.error("Error:", err);
    
            return res.status(500).json({
                success: false,
                message: "An error occurred while fetching the user profile",
                error: err.message,
            });
        }
    },

}


module.exports = UserFunction