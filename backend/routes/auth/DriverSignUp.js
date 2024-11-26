const Driver = require('../../models/DriverSchema');
const bcrypt = require('bcrypt');


const DriverSignUp = async (req,res)=>{

         let IsAlredyExist = await Driver.findOne({email:req.body.email});

        if(!IsAlredyExist){

            try {
                await Driver.validate(req.body)
                
            } catch (error) {
                
                return res.status(400).send({success:false,message:error.message});
            }
                

            await bcrypt.hash(req.body.password, 10).then((hash)=>{
                req.body.password = hash;
            })
            
           const NewDriver = new Driver(req.body);
           NewDriver.save().then(()=>{
                    res.status(200).send({success:true,message:"Driver Created"})
                    
                }).catch((err) => {
                    res.status(400).send({success:false})
                });
        }else{
            res.status(400).send({
                success:false,
                message:"Driver Alredy Exist"
            })
        }


}


module.exports = DriverSignUp;