const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db');

// Generate random bcrypt hash every server startup
//const DUMMY_HASH = await bcrypt.hash('dummy', 10);
// Replaced as previous was causing build error
const DUMMY_HASH = '$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ012345';

router.post('/login', async (req,res) => {
  // const username = req.body.username
  // const password = req.body.password
  const {username, password} = req.body;

  // Send response explaining both a username and password are required to login
  if (!username || !password) {
    return res.status(400).json({message: "Username and password are required"});
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    const user = result.rows[0];
    
    // generalise load times to hide valid passwords
    const hash = user ? user.password_hash : DUMMY_HASH;
    const match = await bcrypt.compare(password,hash);
  
    if (!user || !match){
      return res.status(401).json({message: "Invalid username or password"});
    }

    // Store the information of user in session
    req.session.userId = user.id;
    req.session.role = user.role;

    return res.status(200).json({message:"Login Successful", role: user.role});
  } catch {
    console.error("Login error:",err);
    return res.status(500).json({message: "Server error. Please try again"});
  }
});

router.post('/logout', (req,res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({message:"Logout failed"});
    res.clearCookie("connect.sid");
    return res.status(200).json({message: "Logged out"});
  });
});