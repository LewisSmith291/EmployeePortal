import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './header.css'
import logout from '../assets/logout.png'


export default function Header() {
  const navigate = useNavigate();

  function handleHomePress(){
    // replace: true - adds onto stack (/portal/home/specific-thing)
    // replace: false - replaces route (Will be "/portal")
    navigate("/portal/home", { replace: true });
  }

  function handleProfilePress(){
    navigate("/portal/profile", { replace:true });
  }

  function handleTimeOffPress(){
    navigate("/portal/time-off", { replace:true });
  }

  function handlePayslipsPress(){
    navigate("/portal/payslips", { replace:true });
  }

  return (
    <header id="header">
      <div id="profile-picture" onClick={handleHomePress} aria-label="company logo template"></div>
      <nav>
        <ul>
          <li aria-label="Home Link" onClick={handleHomePress}>Home</li>
          <div className="separator"/>
          <li aria-label="Profile Link" onClick={handleProfilePress}>Employee Profile</li>
          <li aria-label="Time Off Link" onClick={handleTimeOffPress}>Time Off</li>
          <li aria-label="Payslips Link" onClick={handlePayslipsPress}>Payslips</li>
        </ul>
      </nav>
      <img id="logout" src={logout} alt="logout-button"></img>
    </header>
  )
}
