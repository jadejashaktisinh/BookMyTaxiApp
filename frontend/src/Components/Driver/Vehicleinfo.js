import React, { useEffect, useState } from "react";
import "./Vehicleinfo.css";
import { Link, useNavigate } from "react-router-dom";

const Vehicleinfo = () => {
  const [stack, setStack] = useState([]);
  const [formData, setFormData] = useState({
    carCompany: "",
    carName: "",
    carModal: "",
    carNumber: "",
    carType: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStack([...stack, formData]);
    console.log("Stack:", stack);
    alert("Vehicle data added to the stack!");
    fetch("http://localhost:3001/driver/addVehical",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:localStorage.getItem('email') , ...formData})
    }).then((res)=>{
        setFormData({
          carCompany: "",
          carName: "",
          carModal: "",
          carNumber: "",
          carType: "",
        });
        navigate("/Verification");

        
          
    }).catch((err)=>{
      console.log(err);
      
    })

  };


  return (
    <div className="Main">
      <span className="mt-3 h2">Vehicle Information</span>
      <form onSubmit={handleSubmit} action="/Verification">
        <input type="text" name="carCompany" className="mt-2 form-control name" placeholder="Your Car Company Name" value={formData.carCompany} onChange={handleChange} required />
        <input type="text" name="carName" className="mt-2 form-control name" placeholder="Your Car Name" value={formData.carName} onChange={handleChange} required />
        <input type="number" name="carModal" className="mt-2 form-control name number" placeholder="Your Car Year" min="1900" max="2024" step="1" value={formData.carModal} onChange={handleChange} required/>
        <input type="text" name="carNumber" className="mt-2 form-control name" placeholder="Your Car Number" value={formData.carNumber} onChange={handleChange} required/>
        <div className="cartype" style={{ display: "flex" }}>

          <select name="carType" className="mt-2 form-control name select" value={formData.carType} onChange={handleChange} required>
            <option value="">Select Car Type</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Coupe">Coupe</option>
            <option value="Jeep">Jeep</option>
          </select>
        </div>
        <input type="submit" className="mt-4 mb-2 btn btn-light mt-2" value="Sign In"/>
        <small>
          Already have an account?{" "}
          <Link to="/Driver-Login" className="text-warning">
            Login
          </Link>
        </small>
      </form>
    </div>
  );
};

export default Vehicleinfo;
