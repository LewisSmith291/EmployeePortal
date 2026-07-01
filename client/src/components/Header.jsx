import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './header.css'

export default function Header() {
  function handleHomePress(){
    // replace: true - adds onto stack (/portal/home/specific-thing)
    // replace: false - replaces route (Will be "/portal")
    navigate("/portal", { replace: true });
  }

  function handleProfilePress(){
    navigate("/employee-profile", { replace:false });
  }

  function handleTimeOffPress(){
    navigate("/time-off", { replace:false });
  }

  function handlePayslipsPress(){
    navigate("/payslips", { replace:false });
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
