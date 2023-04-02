var express = require('express');
var router = express.Router();
var app = express();
app.use(express.json());
const {DalacaadModel,dalacaadValidate } = require('../Models/Dalacaad')
const { EmpModel, EmpValidate } = require('../Models/EmployeeModel')
const {PaymentModel,PaymentValidate} = require('../Models/PaymentModel')

router.get('/', async (req, res) => {
  const Dalacaad=await DalacaadModel.find().populate({
    path:"Emp_ID",
    model:"Employee",
    select:"Emp_Name"
  });
  res.send(Dalacaad);
});
router.get('/balance/:id', async (req, res) => { 
    let EmployeeData = await EmpModel.findOne({_id:req.params.id});
    let PaymentData = await PaymentModel.find({Emp_ID:req.params.id});
    const Dalacaad=await DalacaadModel.find({Emp_ID:req.params.id});
    let total_salary=0;
    let total_payments=0;
    let balance=0;
   Dalacaad.forEach((dalac)=>{
    total_salary=total_salary+dalac.Dalacaad_Amount
    //console.log(dalac.Dalacaad_Amount)
   })

   PaymentData.forEach((payment)=>{
    total_payments=total_payments+payment.Payment_Amount
    //console.log(dalac.Dalacaad_Amount)
   })
  balance=total_salary-total_payments
    res.send({Emeployee:EmployeeData,EarnedSalary:Dalacaad,Payments:PaymentData,Balance:balance});

  });


router.post('/', async (req, res) => {
  try {
    let { error } = dalacaadValidate(req.body);
    if (error) return res.send(error.message)
    const dalacay = new DalacaadModel(req.body);
    let EmployeeData = await EmpModel.findOne({_id:req.body.Emp_ID});
    // let PaymentData = await PaymentModel.findOne({_id:req.body.Emp_ID});
    if(req.body.Dalacaad_Amount>EmployeeData.Emp_Salary) return res.send('Lama Ogola')
    dalacay.Dalacaad_Amount=EmployeeData.Emp_Salary
    let idCheck
    await dalacay.save();
    res.send({
      status: "Success",
      message: "New Post Added Successfully",
      info: dalacay
    });

  } catch (error) {
    res.send({status:"Error",message:error.message});

  }


});

router.get("/:id", async (req, res) => {
  const Dalacaad = await DalacaadModel.findById(req.params.id);
  if (!Dalacaad) return res.send("This ID is not available");
  res.send(Dalacaad);
});

router.put("/:id", async (req, res) => {
  const DalacaadUpdating = await DalacaadModel.findByIdAndUpdate(req.params.id, req.body,{new:true});
  res.send({
    status: "Success",
    message: "Successfully Updated",
    info: DalacaadUpdating
  });
});
router.delete("/:id", async (req, res) => {
  const dalacaadDeleting = await DalacaadModel.findByIdAndDelete(req.params.id);
  res.send({
    status: "Success",
    message: "Successfully Deleted",
    info: dalacaadDeleting
  });
});

  
module.exports = router;
