const mongoose = require('mongoose');
const joi = require("joi");

const EmployeeSchema = new mongoose.Schema({
    Emp_Name: {
        type: String,
        required: true,

    },
    Emp_Phone: {
        type: Number,
        required: true,
    },

    Emp_Age: {
        type: Number,
        required: true,
    },

    Emp_Email: {
        type: String,
        required: true,
    },
    Emp_JobTitle: {
        type: String,
        required: true,
    },
    Emp_Address: {
        type: String,
        required: true,
    },
    Emp_Salary: {
        type: Number,
        required: true,
    },
    Hire_date: {
        type: Date,
        required: true,
        default: new Date
    },
    Emp_Status:{
        type:String,
        default:'Active',
        enum:['Active', 'Suspended', 'Internaship']
    }
})

function EmpValidate(EmpObj) {
    let Empval = joi.object({
        Emp_Name: joi.string().required(),
        Emp_Age: joi.number().required(),
        Emp_Phone: joi.number().required(),
        Emp_Email: joi.string().email().required(),
        Emp_JobTitle: joi.string().required(),
        Emp_Address: joi.string().required(),
        Emp_Salary: joi.number().required(),
        Emp_Status: joi.string()


    })
    return Empval.validate(EmpObj)
}



const EmpModel = mongoose.model("Employee", EmployeeSchema)

module.exports = {
    EmpModel,
    EmpValidate
}
