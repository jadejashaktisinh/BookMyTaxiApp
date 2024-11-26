const Driver = require('../../models/DriverSchema');
const bcrypt = require('bcrypt');


const DriverLogin = async (req,res)=>{

         let ExistingDriver = await Driver.findOne({email:req.body.email});

         
         if(ExistingDriver ){
            const match = await bcrypt.compare(req.body.password, ExistingDriver.password);

            if(match){
                res.status(200).send({
                    success:true
                })

            }else{
                res.status(400).send({
                    success:false,
                    message:"Password is wrong"
                })

            }            
        }else{

            res.status(400).send({
                    success:false,
                    message:"Email does not  exisst"
            })

        }


}


module.exports = DriverLogin;