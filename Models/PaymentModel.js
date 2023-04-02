const mongoose = require('mongoose');
const joi = require("joi");

const PaymentSchema = new mongoose.Schema({
    Emp_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"

    },
    Payment_Amount: {
        type: Number,
        required: true,
    },

    Payment_Method: {
        type: String,
        required: true,
    },
    Payment_date: {
        type: Date,
        default: new Date
    },

})

function PaymentValidate(PayObj) {
    let Payval = joi.object({
        Emp_ID: joi.string().required(),
        Payment_Amount: joi.number().required(),
        Payment_Method: joi.string().required(),

    })
    return Payval.validate(PayObj)
}



const PaymentModel = mongoose.model("Payment", PaymentSchema)

module.exports = {
    PaymentModel,
    PaymentValidate
}
