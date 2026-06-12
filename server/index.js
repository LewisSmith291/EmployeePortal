require('dotenv').config();
const express = require('express');
const employeeRoutes = require('./routes/employeeRoutes');
const authenticationRouter = require('./routes/authentication');

const app = express();
app.use(express.json());


// Mounts employee router at the '/api/employees' path
app.use('/api/employees', employeeRoutes);

// Mountes authentication router at the '/api/auth' path
app.use('/api/auth', authenticationRouter);

// Reads port from env file and if it cant find one, falls back onto 3000
const PORT = process.env.PORT || 3000;
// Starts the server and tells it to listen for incoming requests on port 3000 (or whatever port is used)
// The callback inline function runs when the server is up
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Temp for testing the connection
const pool = require('./config/db');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connected at:', res.rows[0].now);
  }
});


// Request comes in
// Express checks which router handles that URL
// Router calls the right controller function
// Controller talks to the database and sends back a response
// This file is the entry point that wires all those pieces together