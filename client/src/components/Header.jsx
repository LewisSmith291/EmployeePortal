import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './header.css'


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
      <div id="profile-picture" onClick={handleHomePress}></div>
      <nav>
        <ul>
          <li onClick={handleHomePress}>Home</li>
          <div className="separator"/>
          <li onClick={handleProfilePress}>Employee Profile</li>
          <li onClick={handleTimeOffPress}>Time Off</li>
          <li onClick={handlePayslipsPress}>Payslips</li>
        </ul>
      </nav>
    </header>
  )
}
