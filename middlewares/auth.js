const { verifyToken } = require("../utils/jwt");

const authUser = async (req, res, next) => {

    const token = req.cookies?.token;

    if (!token) {
        const error = new Error("Token Unavailable");
        error.statusCode = 403
        next(error);
        // return res.status(403).json({ message: "Forbidden" });
    } else {
        try {
            const decoded = await verifyToken(token);
            const { username } = decoded;
            req.user = username;

            next();
        } catch (error) {
            return  res.status(403).json({ message: "INVALID TOKEN", err: error.message});
        }
    }
}

module.exports = {
    authUser
}


// const { config } =require ("../config/env.js");
// const jwt =require ("jsonwebtoken");

// const token = req.cookies.token;

// jwt.verify(token, config.ACCESSTOKEN_SECRET, (err, decoded) => {
    //     if (err) {
    //     return res.status(403).json({ message: "INVALID TOKEN" });
    //     }
    //     req.user = decoded;
    //     next();
    // });
// const { verifyToken } = require("../utils/jwt")

// const authUser = (req, res, next) => {

//     const token = req.headers["authorization"]
    
//     if (!token) {
//         return res.status(401).json({ message: "UNAUTHORIZED" });
//     }

//     try {

//         const decoded = verifyToken(token);
//         req.user = decoded;
//         next();
        
//     } catch (error) {
//        return  res.status(403).json({ message: "INVALID TOKEN"});
        
//     }
// }

// module.exports = {
//     authUser
// }