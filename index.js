require("dotenv").config();
const express = require("express");
const pool = require("./db");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/v1/fishing-reports", async (req, res) => {
  const fishingReport = await pool.query("SELECT * FROM fishing_report");
  res.json(fishingReport.rows);
});

app.post("/api/v1/fishing-reports", async (req, res) => {
  try {
    const {
      createdAt,
      spot,
      waterLevel,
      weather,
      typeOfFishing,
      bait,
      food,
      theCatch,
    } = req.body;
    const newFishingReport = await pool.query(
      "INSERT INTO fishing_report (created_at, spot, water_level, weather, type_of_fishing, bait, food, the_catch) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [
        createdAt,
        spot,
        waterLevel,
        weather,
        typeOfFishing,
        bait,
        food,
        theCatch,
      ]
    );
    res.status(201).json(newFishingReport.rows[0]);
  } catch (err) {
    res.status(503);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
