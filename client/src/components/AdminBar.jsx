import './adminBar.css'
import { Link } from 'react-router-dom'

export default function AdminBar({currentUser}) {
  return (
    <div id="admin-bar">
      <p>Admin Bar</p>
      {currentUser.role === "admin" && (
        <p><Link to="/portal/admin/employees">View Employees</Link></p>
      )}
    </div>
  )
}
