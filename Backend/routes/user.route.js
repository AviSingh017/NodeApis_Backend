const express = require("express");
const userRoute = express.Router();

require("dotenv").config();
userRoute.use(express.json());
const jwt  = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {userModel} = require("../models/user.schema");

userRoute.post("/signup",(req,res)=>{
    const {name,email,pass} = req.body;

    try{
        bcrypt.hash(pass,7, async(err,hash)=>{
            if(err){
                res.send({"msg": "Something went wrong", "error":err.message});
            }
            else{
                let user = new userModel({name,email,pass:hash});
                await user.save();
                res.send({"msg": "User Registered Successfully"});
            }
        })
    }
    catch(err){
        res.send({"msg": "Something went wrong", "error":err.message});
    }
});


userRoute.post("/login",async(req,res)=>{
    const {email,pass} = req.body;

    try{
        const user = await userModel.find({email});
        if(!user){
            res.status(401).send({"msg":"Please Register first"})
        }
        const hash_pass = user[0]?.pass;
        if(user.length>0){
            bcrypt.compare(pass,hash_pass,(err,result)=>{
                if(result){
                    let token = jwt.sign({id:user[0]._id}, process.env.jwt_secret, {expiresIn:"1m"});
                    res.status(200).send({"msg":"Logged In", "token":token});
                }
                else{
                    console.log(err);
                }
            })
        }
    }
    catch(err){
        res.status(401).send({"msg":"Something went wrong", "error":err.message});
    }
})

module.exports={
    userRoute
}