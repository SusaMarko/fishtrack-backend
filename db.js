const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "124hadevha1",
  host: "localhost",
  database: "fishtrack",
  port: 5432,
});

module.exports = pool;
