var express = require('express');
var router = express.Router();
const {DalacaadModel} = require('../Models/Dalacaad')
const { EmpModel} = require('../Models/EmployeeModel')
const {PaymentModel} = require('../Models/PaymentModel')
const {UserModel}=require('../models/UserModel');

router.get('/', async (req, res) => {
    const Employeedata=await EmpModel.find();
    let NumerOfEmployees=Employeedata.length;
    const userdata=await UserModel.find();
    let NumerOfUsers=userdata.length;
    const paymentdata=await PaymentModel.find();
    const Payrolldata=await DalacaadModel.find();
    let TotalParoll=Payrolldata.reduce((total,item)=>total+item.Dalacaad_Amount,0);
    let TotalPyments=paymentdata.reduce((total,item)=>total+item.Payment_Amount,0);
    let TotalCredit=TotalParoll-TotalPyments
    res.send({
        NumerOfEmployees,
        NumerOfUsers,
        TotalParoll,
        TotalPyments,
        TotalCredit
    });
  });


module.exports = router;