import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import { API_BASE_URL } from '../apiBase'
import '../employees.css'

function EmployeesPage({ onLogout }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/employees`, {
      credentials: "include",
    })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load employees");
      return res.json();
    })
    .then((data) => setEmployees(data))
    .catch(() => setError("Could not load employee list"))
    .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Header onLogout={onLogout}/>
      <p><Link to="/portal">Back to portal</Link></p>
      <h1>Employees</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.first_name} {emp.last_name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeesPage
