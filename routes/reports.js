const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      req.user,
    ]);

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.get("/fishing-reports", async (req, res) => {
  const fishingReport = await pool.query("SELECT * FROM fishing_report");
  res.json(fishingReport.rows);
});

router.post("/fishing-reports", async (req, res) => {
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

module.exports = router;
