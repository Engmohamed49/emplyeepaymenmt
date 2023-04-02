const express = require("express");
const router = express.Router();
const {UserModel}=require('../models/UserModel');
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



    router.post("/",async (req,res)=>{

    try {
      let {error}=LoginValidation(req.body);
      if(error)return res.send(error.message)
      let userPosting=new UserModel(req.body);
        let currentUserData = await UserModel.findOne({Username:req.body.Username})
        // return res.send(currentUserData)
        if(!currentUserData)return res.send({status:"Error",message:"invalid username or password"})

        let validatePassword = await bcrypt.compare(
            req.body.Password,
            currentUserData.Password
        );
        if(!validatePassword)return res.send({status:"Error",message:"invalid username or password"})
        // let customerInfo = await CustomerModel.findOne({_id:currentUserData.CustomerID})
        //wacheckgareyndoa i.a
        // res.send(studentInfo)
        let token = jwt.sign({id:currentUserData._id,username:currentUserData.Username,Name:currentUserData.Name},"Mydays")
        
        // return res.send(token)
        
        res.header("token",token).json({
            status:'Success',
            message:"Successfully Logged",
            token:token
        })



 

      
    } catch (error) {
      res.send({status:"Error",message:error.message});

      
    }
       
  })
  function LoginValidation(userObj){
    let userVal=joi.object({
        Username:joi.string().email({ tlds: { allow: false } }).required(),
        Password:joi.string().required(),
     
    })
    return userVal.validate(userObj)
}




module.exports=router