import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "dhruvin",
  password: "dhruvindb",
  host: "localhost",
  port: 5432,
  database: "db",
});

export { pool };
