// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const blacklist = new Set(); 

var AuthFunction = {
    default: async (req, res) => {
        res.status(200).json("Every things working fine in Auth Controller");
    },
    register: async (req, res) => {
        const { name, email, password } = req.body;

        try {

            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({
                    success: false,
                    message: "User Already Exist"
                });
            }
            if(!req.body.role || req.body.role==='user'){
                if(!req.body.reportingTo ){
                    return res.status(400).json({
                        success: false,
                        message: "Please Provide reportingTo ID"
                    });
                }else{
                    let checkIsManager = await User.findById(req.body.reportingTo)
                    if (!checkIsManager) {
                        return res.status(400).json({
                            success: false,
                            message: "No Manager Found With Provided reportingTo ID"
                        });
                    }
                }
               
                    
            }
            const hashPassword = await bcrypt.hash(password, 10);

            const data = {
                name,
                email,
                password: hashPassword,
                roles: req.body.role ? req.body.role : "user",
                reporting_to:req.body.reportingTo

            }
            const saveUser = await User.create(data)
            console.log()
            if (!saveUser) {
                return res.status(404).json({
                    success: false,
                    message: "User Data Save Failed"
                })
            }

            const payload = {
                id: saveUser.id,
                name: saveUser.name,
                email: saveUser.email,
                role: saveUser.roles,
                reportingTo:saveUser.reportingTo


            };

            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) throw err;
                return res.status(200).json({
                    success: true,
                    message: "User Created Successfully",
                    data: payload
                });
            });
        } catch (err) {
            console.error("err.message", err);
            return res.status(500).json({
                success: false,
                message: err.message,
            });;
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "No User Exits With Provided Credentials",
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Credentials",
                });
            }

            const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.roles


            };

            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) throw err;
                return res.status(200).json({
                    success: true,
                    message: "Logged In Successfully",
                    data: {
                        token
                    }
                });
            });
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },

    logout: async (req, res) => {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) return res.status(400).json({
                success: false,
                message: 'Token is required for logout'
            });

            jwt.verify(token, process.env.JWT_SECRET, (err) => {
                if (err) return res.status(401).json({
                    success: false,
                    message: 'Invalid token'
                });

                // Add the token to the blacklist
                blacklist.add(token);
                return res.status(200).json({
                    success: true,
                    message: "Logged Out Successfully",
                });
            });
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    }
}


module.exports = AuthFunction