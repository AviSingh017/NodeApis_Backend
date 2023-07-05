const express = require("express");
const userRoute = express.Router();
require("dotenv").config();
userRoute.use(express.json());
const jwt  = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {validatorMiddleware} = require("../middlewares/validator");
const {userModel} = require("../models/usermodel");

// userRoute.post("/signup", validatorMiddleware, (req,res)=>{
//     const {name,email,pass} = req.body;

//     try{
//         bcrypt.hash(pass,7, async(err,hash)=>{
//             if(err){
//                 res.send({"msg": "Something went wrong", "error":err.message});
//             }
//             else{
//                 let user = new userModel({name,email,pass:hash});
//                 await user.save();
//                 res.send({"msg": "User Registered Successfully"});
//             }
//         })
//     }
//     catch(err){
//         res.send({"msg": "Something went wrong", "error":err.message});
//     }
// });

userRoute.post("/login", async (req, res) => {
    const { email, pass} = req.body;
  console.log(req.body);
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        res.status(401).send({ "msg": "Please Register first" });
        return;
      }
      const hash_pass = user.pass;
      bcrypt.compare(pass, hash_pass, (err, result) => {
        if (result) {
          let token = jwt.sign({ id: user._id }, process.env.jwt_secret, { expiresIn: "1m" });
          res.status(200).send({ "msg": "Logged In", "token": token });
        } else {
            res.status(400).send({ "msg": "Something went wrong", "error": err.message });
        }
      });
    } catch (err) {
      res.status(400).send({ "msg": "Something went wrong", "error": err.message });
    }
  });

userRoute.post("/signup", validatorMiddleware, async(req, res) => {
  try {
    const { email, pass, name } = req.body;
    const isUserPresent = await userModel.findOne({ email });

    // all fields presence check
    if (!email || !pass || !name) {
      return res.status(400).send({ msg: "All feilds are required" });
    }

    // User already present in database.
    if (isUserPresent) {
      return res
        .status(400)
        .send({ msg: "Email already taken, try another email or login" });
    }

    // Hash the password.
    const hashedPassword = bcrypt.hashSync(pass, 8);
    const newUser = new userModel({ ...req.body, pass: hashedPassword });
    await newUser.save();
    res.status(200).send({ msg: "Registration successful", user: newUser });
  } catch (error) {
    res.status(500).send({ error: "Registration failed", msg: error.message });
  }
}); 
  

module.exports={
    userRoute
}