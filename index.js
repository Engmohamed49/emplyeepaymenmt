var express = require('express');
const mongoose = require('mongoose')
const EmployeeRouter = require('./routes/EmployeeRouter')
const PaymentRouter = require('./routes/PaymentRoute')
const DalacaadRoute = require('./routes/DalacaadRoute')
const userRoute = require('./routes/UserRoute');
const loginRoute = require('./routes/loginRoute');
const Dashboard = require('./routes/DashboardSummary')
const Middleware=require("./middleware");

var cors = require('cors');
mongoose.set('strictQuery', false)

mongoose.connect("mongodb+srv://employeepaymentuser:i8PQeZX1bVovuUPi@cluster0.wgnqycb.mongodb.net/EmployeePaymentDB")

  .then(() => console.log('Connected!'));  

var app = express();
app.use(express.json());
app.use(cors());  
app.use('/user',Middleware,userRoute);
app.use('/login',loginRoute);
app.use('/employee',Middleware,EmployeeRouter);
app.use('/payment',Middleware,PaymentRouter);
app.use('/Dalacaad',Middleware,DalacaadRoute);
app.use('/summary',Middleware,Dashboard);

module.exports = app;
