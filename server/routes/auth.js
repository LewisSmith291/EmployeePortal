const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../config/db');

router.post('/login', async (req,res) => {
  // const username = req.body.username
  // const password = req.body.password
  const {email, password} = req.body;

  // Send response explaining both a username and password are required to login
  if (!email || !password) {
    return res.status(400).json({message: "Username and password are required"});
  }

  try {
    // Join credentials and employees information into one result
    const result = await pool.query(
      `SELECT e.id, e.first_name, e.last_name, e.email, e.department, e.role, c.password_hash
      FROM employees e
      JOIN credentials c ON c.employee_id = e.id
      WHERE e.email = $1`,
      [email]
    );

    const employee = result.rows[0];
  
    // If no employee was found with this email, give error
    if (!employee){
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // generalise load times to hide valid passwords
    const match = await bcrypt.compare(password, employee.password_hash);
    if(!match){
      return res.status(401).json({ error: "Invalid email or password."});
    }

    // Store the information of user in session
    req.session.employeeID = employee.id;
    req.session.role = employee.role;

    // Send json response back to fontend wih empolyees non-sensitive information
    res.json({
      id: employee.id,
      firstName: employee.first_name,
      lastName: employee.last_name,
      email: employee.email,
      department: employee.department,
      role: employee.role,
    });
  } catch (err){
    // If anything unexpected fails, send a general error
    console.error("Login error:",err);
    return res.status(500).json({message: "Server error. Please try again"});
  }
});

router.post('/logout', (req,res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({message:"Logout failed"});
    res.clearCookie("connect.sid");
    res.json({message: "Logged out"});
  });
});

router.get("/me", (req,res) => {
  if (!req.session.employeeID){
    return res.status(401).json({ error: "Not authenticated" });
  }
  res.json({ employeeID: req.session.employeeID, role: req.session.role })
});

module.exports = router;