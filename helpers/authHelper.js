const jwt = require("jsonwebtoken")

const validateUser = (req, res, next) => {
    try{
        const token = req.headers["authorization"];
        if (!token) {
            throw new Error("No Token Supplied");
        }
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if(err){
            res.status(401).json({
            error: true,
            msg: "Authentication Failed",
            err,decoded
            });
        }else if(decoded){
            req.user = decoded
            next();
        }
        });
    }catch(err){
        res.status(401).json({
            error: true,
            msg: "Authentication Failed",
        });
    }
}

const validateAdmin = (req, res, next) => {
    try{
        const admin = req.user.user.admin;
        if(admin){
            next()
        }else{
            throw new Error("Only admins can operate this route")
        }
    }catch(err){
        res.status(401).json({
            error: true,
            msg: "Only admins can operate this route",
        });
    }
}

exports.validateUser = validateUser;
exports.validateAdmin = validateAdmin;