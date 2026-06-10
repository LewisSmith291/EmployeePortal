const { Pool } = require('pg');
require('dotenv').config();

// Set up and export database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

module.exports = pool;