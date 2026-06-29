// Request comes in
// Express checks which router handles that URL
// Router calls the right controller function
// Controller talks to the database and sends back a response
// This file is the entry point that wires all those pieces together

const dotenv = require('dotenv').config();
const express = require('express');

const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/auth');

// CORS needed since backend and frontend are hosted on different platforms
const cors = require('cors');

const app = express();

// Temp for testing the connection
const pool = require('./config/db');

// so sessions work in production as http will probably be used instead of https
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
};

// Allow origin with development url
const allowedOrigins = [ "http://localhost:5173", "https://lewis-smith-employee-portal.netlify.app"];
// CORS needs to approve the request before it reaches session handling / route
app.use(cors({
  origin: function(origin, callback){
    if (!origin || allowedOrigins.includes(origin)){
      callback(null,true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// New session
app.use(session({
  // store express-session to database "session" table instead of server
  store: new pgSession({ pool }),
  secret: process.env.SESSION_SECRET,
  // Don't flood database with sessions
  resave: false,
  // Only save session  once logged on
  saveUninitialized: false,
  cookie: {
    // Cookie cant be read by JS
    httpOnly: true,
    // allows sending of cookie in production environment, but apart from that requires https 
    secure: process.env.NODE_ENV === 'production',
    // 8h sesion
    maxAge: 1000 * 60 * 60 * 8,
    //Cross site rules preventing phones from making request since netlify and render are seperate sites
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  } 
}));

app.use(express.json());

// Mounts employee router at the '/api/employees' path
app.use('/api/employees', employeeRoutes);

// Mounts authentication router at the '/api/auth' path
app.use('/api/auth', authRoutes);

// Reads port from env file and if it cant find one, falls back onto 3000
const PORT = process.env.PORT || 3000;
// Starts the server and tells it to listen for incoming requests on port 3000 (or whatever port is used)
// The callback inline function runs when the server is up
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connected at:', res.rows[0].now);
  }
});
