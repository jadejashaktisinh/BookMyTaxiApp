const User = require('../../models/UserSchema');
const bcrypt = require('bcrypt');


const UserLogin = async (req,res)=>{

         let ExistingUser = await User.findOne({email:req.body.email});

         const match = await bcrypt.compare(req.body.password, ExistingUser.password);


        if(ExistingUser && match){

            res.status(200).send("Login sucsess")
            
        }else{

            res.status(400).send("Email or password is wrong")

        }


}


module.exports = UserLogin;