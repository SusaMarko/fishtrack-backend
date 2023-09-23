const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to PostgreSQL successfully");
});

module.exports = pool;
