import { Link, useNavigate } from 'react-router-dom'
import '../portal.css'
function PortalPage({ currentUser, onLogout }) {
  const navigate = useNavigate();

  async function handleLogoutClick() {
    await onLogout();
    navigate("/login", { replace: true });
  }

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
    <div>
      <header id="portal-header">
        <div id="portal-profile-picture" onClick={handleHomePress}></div>
        <nav>
          <ul>
            <li onClick={handleHomePress}>Home</li>
            <li onClick={handleProfilePress}>Employee Profile</li>
            <li onClick={handleTimeOffPress}>Time Off</li>
            <li onClick={handlePayslipsPress}>Payslips</li>
          </ul>
        </nav>
      </header>
      <h1>Welcome, {currentUser.firstName} {currentUser.lastName}</h1>
      {currentUser.role === "admin" && (
        <p><Link to="/employees">View Employees</Link></p>
      )}
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}

export default PortalPage;