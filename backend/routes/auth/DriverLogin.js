const Driver = require('../../models/UserSchema');
const bcrypt = require('bcrypt');


const DriverLogin = async (req,res)=>{

         let ExistingDriver = await Driver.findOne({email:req.body.email});

        const match = await bcrypt.compare(req.body.password, ExistingDriver.password);

        if(ExistingDriver && match){

            res.status(200).send("Login sucsess")
            
        }else{

            res.status(400).send("Email or password is wrong")

        }


}


module.exports = DriverLogin;