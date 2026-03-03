const mongoose = require('mongoose');

const connectDB = process.env.DB_URI;

mongoose.connect(connectDB)
.then(()=>{
    console.log('MongoDB is connected Successfully!!');
})
.catch((error)=>{
    console.log("Error Occured"+" "+error)
})