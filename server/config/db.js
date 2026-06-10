const { Pool } = require('pg');
require('dotenv').config();

// Set up and export database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {rejectUnauthorized: false } // Required for Neon
});

module.exports = pool;