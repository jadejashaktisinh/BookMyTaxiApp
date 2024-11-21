const User = require('../../models/UserSchema');
const bcrypt = require('bcrypt');

const UserSignUp = async (req,res)=>{

         let IsAlredyLogedIn = await User.findOne({email:req.body.email});

        if(!IsAlredyLogedIn){
            User.validate(req.body).then(() => {
                console.log("true");
                
            }).catch((err) => {
                res.status(400).send(err.errors)
            });

            await bcrypt.hash(req.body.password, 10).then((hash)=>{
                req.body.password = hash;
            })
            
           const NewUser = new User(req.body);
                NewUser.save().then(()=>{
                    res.status(200).send("User Created")
                    
                }).catch((err) => {
                    res.status(400).send(err.errors)
                });
            
        }else{
            res.status(400).send("User Alredy Exist")
        }


}


module.exports = UserSignUp;