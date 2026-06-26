require("dotenv").config();
const bcrypt = require("bcrypt");
const pool = require("./config/db.js");

// Password field is plaintext use in this script to generate the hash, but is never stored in database
const empolyees = [
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
    const result = await pool.query(
      `INSERT INTO employees (first_name, last_name, email, department, role)
      VALUES ($1, $2, $3, $4, $4)
      RETURNING id`,
      [emp.first_name, emp.last_name, emp.email, emp.department, emp.role]
    );
    const employeeID = result.rows[0].id;

    // Hash password
    // salt adds a number of random charaters to the password to make identical passwords not look identical in database
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(emp.password, saltRounds);

    await pool.query(
      `INSERT INTO credentials (employee_id, password_hash)
      VALUES ($1, %2)`,
      [employeeID, passwordHash]
    );

    console.log(`Seeded: ${emp.email}`);
  }

  pool.end();
};

seed().catch(console.error);