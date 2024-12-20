import React, { useState } from 'react';
import './Login.css';
import { Link,useNavigate } from 'react-router-dom';

const Userlog = () => {
  const [stack, setStack] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStack([...stack, formData]);
    setFormData({ email: '', password: '' });
    fetch("http://localhost:3001/user/login",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    }).then((res)=>{
      res.json().then((data)=>{
        if(data.success){
          localStorage.setItem('email',formData.email)
          localStorage.setItem('type',"user");
          
          navigate("/User-Home");
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
      <span className="h1">Sign In</span>
      <form onSubmit={handleSubmit} action='/Verification'>
        <input type="email" name="email" className="mt-4 form-control" placeholder="Your email" value={formData.email} onChange={handleChange}/> 
        <input type="password" name="password" className="mt-2 form-control" placeholder="Your password" value={formData.password} onChange={handleChange} />
        <br />
        <input type="submit" className="mb-2 btn btn-light mt-2" value="Sign In" />
        <div id="errors" style={{color:"red",fontSize:"0.8rem"}}>
      </div>
        <small>
          You do not have an account?{' '}
          <Link to="/User-Signup" className="text-warning">
            Sign Up
          </Link>
        </small>
      </form>
    </div>
  );
};

export default Userlog;
