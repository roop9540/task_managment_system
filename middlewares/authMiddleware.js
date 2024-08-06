

// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');


const tokenVerify = (req, res, next)=> {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    console.log("tokenVrify", token)

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No token, authorization denied'
        });
    }
    if (req.headers['authorization'] && req.headers['authorization'].split(' ')[0] === 'Token' ||
        req.headers['authorization'] && req.headers['authorization'].split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded",decoded)
        req.user_id = decoded.id;
        req.name = decoded.name,
            req.email = decoded.email,
            req.role = decoded.role
            console.log("req.role",req.role)
        next();
    } catch (err) {
        res.status(401).json({
            success: false,
            message: 'Token is not valid'
        });
    }
};

const authJwt = {
    tokenVerify: tokenVerify
};
module.exports = authJwt