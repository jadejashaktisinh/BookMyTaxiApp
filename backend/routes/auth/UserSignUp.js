const User = require('../../models/UserSchema');
const bcrypt = require('bcrypt');

const UserSignUp = async (req,res)=>{

         let IsAlredyLogedIn = await User.findOne({email:req.body.email});

        if(!IsAlredyLogedIn){

            try {
                await User.validate(req.body)
                
            } catch (error) {
                
                return res.status(400).send({success:false,message:error.message});
            }

            await bcrypt.hash(req.body.password, 10).then((hash)=>{
                req.body.password = hash;
            })
            
           const NewUser = new User(req.body);

                NewUser.save().then(()=>{
                    res.status(200).send({
                        success:true,
                        message:"done"
                    })
                    
                }).catch((err) => {
                    res.status(400).send({success:false,message:err})
                });
            
        }else{
            res.status(400).send({
                success:false,
                message:"User Alredy Exist"
            })
        }


}


module.exports = UserSignUp;