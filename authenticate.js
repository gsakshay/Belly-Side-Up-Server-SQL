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

module.exports = validateUser;