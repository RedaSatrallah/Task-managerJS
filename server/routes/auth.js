const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt= require("bcryptjs");
require("dotenv").config();

router.post("/register", async(req,res)=>{
    try {
        const{name, email, password} =req.body;
        if(!name || !email || !password){
            return res.status(400).json({message: "Please fill all fields"});
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({message:"User already exists"});
        }
        const newUser = new User({name, email, password});
        await newUser.save();
        const token = jwt.sign(
            {id: newUser._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );
        res.status(201).json({
            user:{
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
            token
        });
    } catch(err){
        console.error(err);
        res.status(500).json({message: "Server error"});
    }
});
router.post('/login',async(req,res)=>{
    const{ email, password}= req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({error: 'Invalid credentials'});
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({error: 'Invalid credentials'});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn: '1d',});
        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
})
module.exports = router;