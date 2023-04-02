const express=require('express');
const router=express.Router();
const {UserModel,UserValidate}=require('../models/UserModel');
const bcrypt = require("bcrypt");
const joi=require('joi');
const { request } = require('express');


router.get('/',async(req,res)=>{
    let GetUserInfo=await UserModel.find();
    res.send(GetUserInfo);
});
router.get('/:id',async(req,res)=>{
    let findSpecificUser=await UserModel.findById(req.params.id)
    res.send(findSpecificUser);


});

router.post('/',async(req,res)=>{
    try {
        let { error } = UserValidate(req.body);
        if (error) return res.send(error.message)
        const user = new UserModel(req.body);
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(user.Password,salt)
        // if(req.body.Username==user.Username){
        //     return res.send({
        //         status: "Error",
        //         message: "This User already exists"
        //     })
        // }
        // else 
        res.send({
            status: "Success",
            message: "Successfully Added",
            info: user
          });
        await user.save();      
      } catch (error) {
        res.send(error.message);
    
      }
    
});


router.put('/:id',async(req,res)=>{
    const userUpdating = await UserModel.findByIdAndUpdate(req.params.id, req.body,{new:true});
    res.send({
        status: "Success",
        message: "Successfully Updated",
        info: userUpdating
      });
})
router.delete('/:id',async(req,res)=>{
   let userDelating= await UserModel.findByIdAndDelete(req.params.id);
    res.send({
        status: "Success",
        message: "Successfully Deleted",
        info: userDelating
      });
});









module.exports=router