const mongoose=require('mongoose');
const joi = require("joi");

const UserSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Username:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    User_Status:{
        type : String,
        default:"Active",
        enum:["Active", "Blocked", "Pending"]
    },
});

function UserValidate(PayObj) {
    let Payval = joi.object({
        Name: joi.string().required(),
        Username: joi.string().email().required(),
        Password: joi.string().required(),

    })
    return Payval.validate(PayObj)
}

const UserModel=new mongoose.model('user',UserSchema)

module.exports={
    UserModel,
    UserValidate
}