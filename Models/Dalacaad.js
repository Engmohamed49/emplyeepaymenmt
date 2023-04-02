const mongoose = require('mongoose');
const joi = require("joi");

const DalacadSchema = new mongoose.Schema({
    Emp_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"

    },
    Dalacaad_Amount: {
        type: Number,
        required: true
    },
    Dalacaad_date: {
        type: Date,
        required: false,
        default: new Date
    },
    Dalacaad_Purpose: {
        type: String,
        required: true,
        default: "Monthly Salary"
    }
})

function dalacaadValidate(PayObj) {
    let Payval = joi.object({
        Emp_ID: joi.string().required(),
        Dalacaad_Amount: joi.number(),
        Dalacaad_Purpose:joi.string()

    })
    return Payval.validate(PayObj)
}



const DalacaadModel = mongoose.model("Dalacaad", DalacadSchema)

module.exports = {
    DalacaadModel,
    dalacaadValidate
}
