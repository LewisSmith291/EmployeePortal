import { Link, useNavigate } from 'react-router-dom'
import '../portal.css'
import Header from '../components/Header.jsx'
function PortalPage({ currentUser, onLogout }) {
  const navigate = useNavigate();

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
      {currentUser.role === "admin" && (
        <p><Link to="/portal/admin/employees">View Employees</Link></p>
      )}
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}

export default PortalPage;