const pool = require('../config/db');
// Contains logic for handling requests

// Function for returning list of employees from database
const getEmployees = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
};

module.exports = { getEmployees };