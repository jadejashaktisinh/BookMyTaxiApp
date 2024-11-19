import './App.css';
import Navbar from './Components/Navbar';
import Userlog from './Components/Users/Login';
import {
  Routes,
  Route,
} from "react-router-dom";
import UserSignup from './Components/Users/Signup';
import Driverlog from './Components/Driver/Login';
import DriverSignup from './Components/Driver/Signup';
import Vehicleinfo from './Components/Driver/Vehicleinfo';
import React from 'react'
import Verification from './Components/Verification';
function App() {

  return (
    <>
      <Navbar/>
      <br></br>
      <br></br>
      <br></br>
    
      <Routes>
          <Route exact path="/User-Login" element={<Userlog/>} />
             
          <Route exact path="/Driver-Login" element={ <Driverlog/>}/>
          <Route exact path="/User-Signup" element={<UserSignup/>}/>
          <Route exact path="/Driver-Signup" element={<DriverSignup/>}/>
            
          <Route exact path="/Driver-Vehical-infromation" element={<Vehicleinfo/>}/>
          <Route exact path="/Verification" element={<Verification/>} />
        </Routes>
      
      
    </>
  );
}

export default App;
