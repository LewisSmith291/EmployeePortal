import { Link, useNavigate } from 'react-router-dom'

function PortalPage({ currentUser, onLogout }) {
  const navigate = useNavigate();

  async function handleLogoutClick() {
    await onLogout();
    navigate("/login", { replace: true });
  }

  return (
    <div>
      <h1>Welcome, {currentUser.firstName} {currentUser.lastName}</h1>
      {currentUser.role === "admin" && (
        <p><Link to="/employees">View Employees</Link></p>
      )}
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}

export default PortalPage
