const Driver = require('../../models/DriverSchema');

const DriverSignUp = async (req,res)=>{

         let IsAlredyExist = await Driver.findOne({email:req.body.email});

        if(!IsAlredyExist){

            Driver.validate(req.body).then(() => {
                console.log("true");
                
            }).catch((err) => {
                res.status(400).send(err.errors)
            });

            await bcrypt.hash(req.body.password, 10).then((hash)=>{
                req.body.password = hash;
            })
            
           const NewDriver = new Driver(req.body);
           NewDriver.save().then(()=>{
                    res.status(200).send("Driver Created")
                    
                }).catch((err) => {
                    res.status(400).send(err.errors)
                });
        }else{
            res.status(400).send("Driver Alredy Exist")
        }


}


module.exports = DriverSignUp;