import React, { useState } from 'react';
import './Login.css';
import { Link,useNavigate } from 'react-router-dom';

const Driverlog = () => {
  const [stack, setStack] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const navgiate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setStack([...stack, formData]);
    console.log('Stack:', stack);
    alert('Login data added to the stack!');
    setFormData({ email: '', password: '' });
    navgiate("/Driver-Home");
  };
 
  return (
    <div className="Main">
      <span className="h1">Sign In Driver</span>
      <form onSubmit={handleSubmit} action='/Verification'>
        <input type="email" name="email" className="mt-4 form-control" placeholder="Your email" value={formData.email} onChange={handleChange}/> 
        <input type="password" name="password" className="mt-2 form-control" placeholder="Your password" value={formData.password} onChange={handleChange} />
        <br />
        <input type="submit" className="mb-2 btn btn-light mt-2" value="Sign In" />
        <small>
          You do not have an account?{' '}
          <Link to="/Driver-Signup" className="text-warning">
            Sign Up
          </Link>
        </small>
      </form>
    </div>
  );
};

export default Driverlog;
