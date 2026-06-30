const pool = require('../config/db');i
// Contains logic for handling requests

// Function for returning list of employees from database
const getEmployees = async (req, res) => {
  // Only logged-in admins can list every employee
  if (!req.session.employeeID) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  if (req.session.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const result = await pool.query('SELECT * FROM employees');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
};

module.exports = { getEmployees };