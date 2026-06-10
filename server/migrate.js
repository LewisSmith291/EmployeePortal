require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pool = require('./config/db');

// async function so you can await responses from database
const runMigrations = async () => {
  // Point to the migrations folder no matter where this is run
  const migrationsDir = path.join(__dirname, 'migrations');
  // Reads files in migration folder and sorts them alphabetically
  // Using numbered files (001,002) this ensures the files are always run in the correct order
  const files = fs.readdirSync(migrationsDir).sort();

  // Loops through each file
  for (const file of files){
    // Reads contents of files as strings
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');
    console.log(`Running migration: ${file}`);
    // Sends SQL to database
    await pool.query(sql);
    console.log(`Done: ${file}`);
  }

  // End database connection
  pool.end();
};

// Call the function, logging any errors
runMigrations().catch(console.error);