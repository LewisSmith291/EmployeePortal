CREATE TABLE IF NOT EXISTS credentials (
  id SERIAL PRIMARY KEY,
  -- ON DELETE CASCADE means that if an employee id is deleted from the empolyees table, its row is deleted from this table
  employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  password_hash TEXT NOT NULL,
  -- Timestamp with time zone
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT credentials_empolyee_id_unique UNIQUE (employee_id)
);
