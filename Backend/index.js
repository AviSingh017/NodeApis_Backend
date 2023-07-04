const express = require("express");
const {connection} = require("./config/db");
require("dotenv").config();

const {userRoute} = require("./routes/user.route");

const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello world!");
});

app.use("/user", userRoute);

app.listen(process.env.port, async()=>{
    try{
        await connection;
        console.log("Connected to DB");
    }
    catch(err){
        console.log(err);
    }
    console.log(`Server is running on port ${process.env.port}`);
});