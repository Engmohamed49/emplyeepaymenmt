var express = require('express');
var router = express.Router();
var app = express();
app.use(express.json());
const { EmpModel} = require('../Models/EmployeeModel')
const {PaymentModel,PaymentValidate} = require('../Models/PaymentModel')

router.get('/', async (req, res) => {
  try {
      let Payment=await PaymentModel.find().populate({
    path:"Emp_ID",
    model:"Employee",
    select:"Emp_Name"
  })
  res.send(Payment);
  } catch (error) {
    res.send(error.message); 
  }  
});
router.get('/latestpayment', async (req, res) => {
  try {
      let Payment=await PaymentModel.find().populate({
    path:"Emp_ID",
    model:"Employee",
    select:"Emp_Name"
  }).sort({'Payment_date':-1}).limit(5)
  res.send(Payment);
  } catch (error) {
    res.send(error.message); 
  }  
});
router.get('/payment/:id', async (req, res) => {
    const petient = await PaymentModel.findById(req.params.id)
    res.send(petient)

});


router.post('/', async (req, res) => {
  try {
    let { error } = PaymentValidate(req.body);
    if (error) return res.send(error.message)
    const Payment = new PaymentModel(req.body);

    //InvoicePosting.TotalAmount=(req.body.Quantity*req.body.Price)
    //500-400=100
    //100
    //500-40
    //460
    
//   Payment.Emp_Balance=(EmployeeData.Emp_Salary-req.body.Payment_Amount)
//     //PaymentModel.Emp_Balance=EmployeeData.Emp_Salary-req.body.Payment_Amount
// currenEmpBalance-req.body.Payment_Amount;
// await EmployeeData.findByIdAndUpdate(req.body.Emp_ID,{
//     Emp_Balance:currenEmpBalance,
//    },{new:true});

    
    res.send({
      status: "Success",
      message: "Successfully Paid",
      info: Payment
    });
    await Payment.save();

  } catch (error) {
    res.send({status:"Error",message:error.message});

  }


});

router.put('/:id',async (req,res)=>{
  const PaymentUpdating = await PaymentModel.findByIdAndUpdate(req.params.id, req.body,{new:true});
  res.send({
    status: "Success",
    message: "Successfully Updated",
    info: PaymentUpdating
  })
});
router.delete("/:id", async (req, res) => {
  const PaymentDeleting = await PaymentModel.findByIdAndDelete(req.params.id);
  res.send({
    status: "Success",
    message: "Successfully Deleted",
    info: PaymentDeleting
  });
});

module.exports = router;
