import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import '../portal.css'
import Header from '../components/Header.jsx'
import NewsItem from '../components/NewsItem.jsx'
import logout from "../assets/logout.png";
import AdminBar from '../components/AdminBar.jsx'

function PortalPage({ currentUser, onLogout }) {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);

  async function handleLogoutClick() {
    await onLogout();
    navigate("/login", { replace: true });
  }

  function handleHomePress(){
    // replace: false - adds onto stack (/portal/home/specific-thing)
    // replace: true - replaces route (Will be "/portal")
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
    <div>
      <Header/>
      <h1>Welcome, {currentUser.firstName} {currentUser.lastName}</h1>
      { currentUser.role === "admin" && <AdminBar></AdminBar>}
      <div id="news-container">
        <h1>News</h1>
        <NewsItem articleName="Example News Item" articleDate="24/10/2026"></NewsItem>
        <NewsItem articleName="You need to sign something" articleDate="19/11/2026"></NewsItem>
      </div>
      {currentUser.role === "admin" && (
        <p><Link to="/portal/admin/employees">View Employees</Link></p>
      )}
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}

export default PortalPage;