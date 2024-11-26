const User = require('../../models/UserSchema');
const bcrypt = require('bcrypt');


const UserLogin = async (req,res)=>{

         let ExistingUser = await User.findOne({email:req.body.email});

         
         
         if(ExistingUser){
            
            const match = await bcrypt.compare(req.body.password, ExistingUser.password);
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


module.exports = UserLogin;