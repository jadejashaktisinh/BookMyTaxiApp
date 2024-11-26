import React, { useEffect, useState } from "react";
import "./Otp.css";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const [stack, setStack] = useState(["", "", "", ""]);

  const handleChange = (e, index) => {
    const value = e.target.value.slice(0, 1);
    const updatedStack = [...stack];
    updatedStack[index] = value;
    setStack(updatedStack);
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (stack.every((digit) => digit !== "")) {

          if(stack.join("") === localStorage.getItem("otp")){

            navigate("/Home");
          }
      

      
    } else {
      alert("Please fill all the fields!");
    }

  };

  useEffect(()=>{
    
    fetch("http://localhost:3001/verification",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        email:localStorage.getItem('email'),
        type:localStorage.getItem("type")
      })
    }).then((res)=>{
          res.json().then((data)=>{

            console.log(data);
            
            if(data.success){
              
                localStorage.setItem("otp",data.otp)
            }
          })
    })
  },[])

  return (
    <>
      <div className="Verification-cn text-white mb-2 pt-3 pb-3 h5">
        Enter the OTP sent To Email<label id="Message-number"></label> 
      </div>
      <div className="container Verification-cn">
        <header>
          <i className="bx bxs-check-shield"></i>
        </header>
        <h4 className="text-light">Enter OTP Code</h4>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            {stack.map((_, index) => (
              <input key={index} type="number" value={stack[index]} onChange={(e) => handleChange(e, index)} required />
            ))}
          </div>
          <button type="submit">Verify OTP</button>
        </form>
      </div>
    </>
  );
};

export default Verification;
