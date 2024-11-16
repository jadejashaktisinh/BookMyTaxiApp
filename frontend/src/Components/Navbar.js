import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
<nav className="navbar navbar-expand-lg navbar-scroll fixed-top shadow-0 border-bottom border-dark">
  <div className="container">
    <a className="navbar-brand" href="#!">BookMyTexi</a>
    <button className="navbar-toggler" type="button" data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
      aria-label="Toggle navigation">
      <i className="fas fa-bars"></i>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#!">How It Works</a>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/User-Login">Book a Ride</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Driver-Login">Drive with Us</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#!">About Us</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#!">Contect Us</a>
        </li>
        <button type="button" className="btn btn-dark ms-3">Get Started</button>
      </ul>
    </div>
  </div>
</nav>
</>
  )
}

export default Navbar
