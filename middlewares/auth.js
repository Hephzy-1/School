// const { config } =require ("../config/env.js");
// const jwt =require ("jsonwebtoken");
const { verifyToken } = require("../utils/jwt")

const authUser = (req, res, next) => {

    // const token = req.cookies.token;
    const token = req.headers["authorization"]
    
    if (!token) {
        return res.status(401).json({ message: "UNAUTHORIZED" });
    }
    
    // jwt.verify(token, config.ACCESSTOKEN_SECRET, (err, decoded) => {
    //     if (err) {
    //     return res.status(403).json({ message: "INVALID TOKEN" });
    //     }
    //     req.user = decoded;
    //     next();
    // });

    try {

        const decoded = verifyToken(token);
        req.user = decoded;
        next();
        
    } catch (error) {
       return  res.status(403).json({ message: "INVALID TOKEN"});
        // next(error)
    }
}

module.exports = {
    authUser
}