require("dotenv").config();
const bcrypt = require("bcrypt");
const pool = require("./config/db.js");

// Password field is plaintext use in this script to generate the hash, but is never stored in database
const employees = [
  { 
    first_name: "Lewis",
    last_name: "Smith",
    email: "lewissmith@example.com",
    department: "Development",
    role: "admin",
    password: "TempPassword123!",
  },
  { 
    first_name: "Cerys",
    last_name: "Hughes",
    email: "ceryshughes@example.com",
    department: "Managing",
    role: "employee",
    password: "SplimFlim123!",
  },
];

const seed = async () => {
  for (const emp of employees){
    // Insert employees
    // Placeholders ($1,$2, etc.) are used to prevent SQL injection
    // RETURNING id tells Postgres to send back the auto-generated ID since it is needed for next step
    const result = await pool.query(
      `INSERT INTO employees(first_name, last_name, email, department, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id`,
      [emp.first_name, emp.last_name, emp.email, emp.department, emp.role]
    );
    const employeeID = result.rows[0].id;

    // Hash password
    // (cost factor)/salt rounds adds a number of random charaters to the password to make identical passwords not look identical in database
    const saltRounds = 12;
    // bcrypt.hash uses one-way hashing algorithm so you can only check if given password matches hash
    const passwordHash = await bcrypt.hash(emp.password, saltRounds);

    await pool.query(
      `INSERT INTO credentials (employee_id, password_hash)
      VALUES ($1, $2)`,
      [employeeID, passwordHash]
    );

    console.log(`Seeded: ${emp.email}`);
  }

  // Close db connetcion
  pool.end();
};

seed().catch(console.error);