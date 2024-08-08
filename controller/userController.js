// <-----------------importing bcrypt for hashing password--------------------->
const bcrypt = require("bcrypt");

// <----------------importing jwt for generating token ------------------------->
const jwt = require("jsonwebtoken");

// <-----------------importing model for performing operation -------------------->
const {userModal}=require("../modal/userModal")

// <--------------dotenv for accessing port no from env file--------------->
require("dotenv").config();

const { redisClient } = require("../config/redis");


// <-------------------register for employee------------------>
const register = async (req, res) => {

const {email,password}=req.body
    try {
         // Input validation - check that name, email, and password are present in the request body
    if (!email  || !password) {
      return res.status(400).json({
        message: "Name, mobile,email and password are required.",
      });
    }
        const check=await userModal.find({email})
        // <----------here checking if employee is already register or not ----------------->
        if(check.length>0){
            return res.status(400).json({"message":"User already exist"})
        }
        // <------------hashing password------------------>
        bcrypt.hash(password, 5, async(err, secure_password)=> {
           if(err){
            console.log(err)
           }else{
            const user=new userModal({email,password:secure_password});
            await user.save();
            res.status(201).json({"message":"User Registeration  successfully"})
           }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({"message":"Getting error while creating account"})
    }
};



// <---------------login for employee----------------------->
const login = async (req, res) => {
try {
    const { email, password } = req.body;
    const user = await userModal.findOne({email});
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token=jwt.sign({userId:user.id},process.env.key );
    await redisClient.set("token",token,{EX:5*60})
    res.status(200).json({message:"Login successfull", token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// <-------------exporting login,register--------------------------->
module.exports = {
  login,
  register,
};