const express = require('express');
const mongoose = require('mongoose');
const categoryRoutes = require('./routes/CategoryRoutes');
const todoRoutes = require('./routes/todoRoutes');
const otpRoutes = require('./routes/otpRoutes');

// Enviromental Variables
require('dotenv').config();

// App Module
const app = express();

// Middlewars
app.use(express.json())

// MongoDB Connection String
const mongoDBConnectionString = "mongodb+srv://Kushagra:"+process.env.COLLECTIONPASS+"@todolistserver.vqqdw.mongodb.net/TodoListServerCopy";

// Connecting to MongoDB
mongoose.connect(mongoDBConnectionString,{useNewUrlParser:true,useUnifiedTopology: true},err=>{
    if(err){
        console.log(err);
    }
    else{
        app.listen(process.env.PORT || 8000,console.log("Server Running on PORT 8000"));
    }
});

// Category Routes
app.use('/category',categoryRoutes);
app.use('/todos',todoRoutes);
app.use('/otp',otpRoutes);




