import React, { useEffect, useState } from "react";
import "./Signup.css";
import { Link,useNavigate } from "react-router-dom";

const UserSignup = () => {
  const [stack, setStack] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const Navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value,});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setStack([...stack, formData]);
    setFormData({ name: "", mobile: "", email: "", password: "" });
    
    fetch("http://localhost:3001/user/singup",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    }).then((res)=>{
      res.json().then((data)=>{
        if(data.success){
          localStorage.setItem('email',formData.email);
          localStorage.setItem('type',"user");

          Navigate("/Verification");
        }else{
              
          document.getElementById("errors").innerHTML = data.message
              
        }
          })
          
    }).catch((err)=>{
      console.log(err);
      
    })
  };


  return (
    <div className="Main">
      <span className="h1">Sign Up</span>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" className="mt-4 form-control name" placeholder="Your Name" value={formData.name} onChange={handleChange} required/>
        <input type="tel" name="mobile" className="mt-2 form-control name" placeholder="Your Mobile Number" value={formData.mobile} onChange={handleChange} required />
        <input type="email" name="email" className="mt-2 form-control" placeholder="Your Email" value={formData.email} onChange={handleChange} required/>
        <input type="password" name="password" className="mt-2 form-control" placeholder="Your Password" value={formData.password} onChange={handleChange}required />
        <br/>
        <input type="submit" className="mb-2 btn btn-light mt-2" value="Sign In" />
        <div id="errors" style={{color:"red",fontSize:"0.8rem"}}>
        </div>
        <small>
          Already have an account?{" "}
          <Link to="/User-Login" className="text-warning">
            Login
          </Link>
        </small>
      </form>
    </div>
  );
};

export default UserSignup;
