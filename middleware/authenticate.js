const jwt = require("jsonwebtoken");
const USER = require("../models/userSchema");
const secreatKey=process.env.secreatKey;

const authenicate = async(req,res,next)=>{
    try {
        const token= req.cookies.ecomerce
        
        
        
        const verifyToken = jwt.verify(token,secreatKey);
        
        const rootUser = await USER.findOne({_id:verifyToken.userId});
       
       
        if(!rootUser){ throw new Error("User Not Found") };

        req.token = token; 
        req.rootUser = rootUser;   
        req.userID = rootUser._id;   
    
        next();  


    } catch (error) {
        res.status(401).send("Unauthorized:No token provided");
        
    }
};

module.exports = authenicate;