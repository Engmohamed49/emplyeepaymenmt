var express = require('express');
var router = express.Router();
var app = express();
app.use(express.json());
const { EmpModel, EmpValidate } = require('../Models/EmployeeModel')

router.get('/', async (req, res) => {
  const Employee=await EmpModel.find();
  res.send(Employee);
});

router.get('/:id', async (req, res) => {
  const emp = await EmpModel.findById(req.params.id);
  res.send(emp);
})


router.post('/', async (req, res) => {
  try {
    let { error } = EmpValidate(req.body);
    if (error) return res.send(error.message)
    const emp = new EmpModel(req.body);
    res.send({
      status: "Success",
      message: "New Post Added Successfully",
      info: emp
    });
    await emp.save();

  } catch (error) {
    res.send({status:"Error",message:error.message});

  }


});

router.put('/:id',async (req,res)=>{
  const EmployeeUpdating = await EmpModel.findByIdAndUpdate(req.params.id, req.body,{new:true});
  res.send({
    status: "Success",
    message: "Successfully Updated",
    info: EmployeeUpdating
  })
});
router.delete("/:id", async (req, res) => {
  const EmployeeDeleting = await EmpModel.findByIdAndDelete(req.params.id);
  res.send({
    status: "Success",
    message: "Successfully Deleted",
    info: EmployeeDeleting
  });
});

module.exports = router;
