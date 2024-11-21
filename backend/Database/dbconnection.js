
const mongoose = require('mongoose')
require("dotenv").config();



mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connecterd");
    
}).catch((err)=>{
      console.log(err + 'fuck');
  
})
