const Driver = require('../../models/DriverSchema');

const addVehical = async (req,res)=>{

    const {email , ...vehicalData} = req.body;
    console.log(email,vehicalData);
    
   const newD = await Driver.findOneAndUpdate({email:email},{vehical:vehicalData},{new:true})

    res.status(200).send(newD);

}
module.exports = addVehical