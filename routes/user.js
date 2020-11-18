const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin')
const bcrypt = require('bcryptjs');
const User = mongoose.model("User");
const jwt =  require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/signup',(req,res)=>{
  
    const {firstName,lastName, email, password} = req.body 
 
    if(!email || !password || !firstName || !lastName){
       return res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
          return res.status(422).json({error:"user already exists with that email"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
              const user = new User({
                firstName,
                lastName,
                  email,
                  password:hashedpassword
                 
              })      
              user.save()
              .then(user=>{
            
                  res.json({message:"saved successfully"})
              })
              .catch(err=>{
                  console.log(err)
              })        })
       
    })
    .catch(err=>{
     res.json({message: err})
    })
  })

  router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
               const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
               const {_id,name,email,followers,following,pic} = savedUser
               res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
           res.json({message: err})
        })
    })
})

module.exports = router