const jwt = require("jsonwebtoken");
const {userModel} = require("../models/user.schema");
require("dotenv").config();

const auth = async(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).send({ error: 'Unauthorized' });
    }
    if(token){
        jwt.verify(token,process.env.jwt_secret,async(err,decode)=>{
            if(decode){
                req.body.id = decode.id;
                const userData = await userModel.findByID({_id:decode.id});
                req.user = userData;
                if(!userData){
                    return res.status(401).send({ error: "Unauthorized" });
                }
                next();
            }
            else{
                res.status(401).send({ error: "Please Login Again" });
            }
        })
    }
    else{
        res.status(401).send({ "msg": "Please Login Again","error":err.message});
    }
};

module.exports={
    auth
}