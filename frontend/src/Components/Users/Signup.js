import React, { useState } from "react";
import "./Signup.css";
import { Link,useNavigate } from "react-router-dom";

const UserSignup = () => {
  const [stack, setStack] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });
  const Navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value,});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setStack([...stack, formData]);
    console.log("Stack:", stack);
    alert("User data added to the stack!");
    setFormData({ name: "", mobile: "", email: "", password: "" });
    Navigate("/Verification");
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
