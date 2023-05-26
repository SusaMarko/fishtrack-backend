require("dotenv").config();
const express = require("express");
const pool = require("./db");

const app = express();

app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("hello");
});

app.get("/api/v1/fishing-reports", async (req, res) => {
  const fishingReport = await pool.query("SELECT * FROM fishing_report");
  res.json(fishingReport.rows);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
