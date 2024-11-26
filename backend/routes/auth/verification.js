const Driver = require("../../models/DriverSchema")
const User = require("../../models/UserSchema")
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: 'jadejashakti888@gmail.com',
        pass: 'bhkf hczk xxjv vhgr'
    }
});

async function SendOtp(email,otp) {
    const info = await transporter.sendMail({
      from: "jadejashakti888@gmail.com",
      to: email, // list of receivers
      subject: "Otp for verification", // Subject line
      text: `your opt for BookMyTaxi is ${otp}`, // plain text body
      
    });
}

const Verification = async(req,res)=>{

     const {email,type} = req.body;
     let otp = Math.floor(1000 + Math.random() * 9000);

     try {
      await  SendOtp(email,otp).then(()=>{console.log("done");
      }).catch((err)=>{console.log(err);
      })
     } catch (error) {
        console.log(error)
     }

        if(type === "driver"){
              const Savedotp = await Driver.findOneAndUpdate({email:email},{otp:otp},{new:true});
              return res.status(200).send({success:true,otp:Savedotp.otp,message:`otp sent to ${Savedotp.email}`,otp:Savedotp.otp})
        }else{

            const Savedotp = await User.findOneAndUpdate({email:email},{otp:otp},{new:true});
            return res.status(200).send({success:true,otp:Savedotp.otp,message:`otp sent to ${Savedotp.email} `,otp:Savedotp.otp})

        }


}
module.exports = Verification