const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT u.user_id, u.user_name, f.id, f.created_at, f.spot, f.water_level, f.weather, f.type_of_fishing, f.bait, f.food, f.the_catch FROM users AS u LEFT JOIN fishing_report AS f ON u.user_id = f.user_id"
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.get("/fishing-reports/search", authorization, async (req, res) => {
  try {
    const { term } = req.query;

    const fishingReports = await pool.query(
      "SELECT * FROM fishing_report WHERE user_id = $1 AND created_at || spot || water_level || weather || type_of_fishing || bait || food || the_catch LIKE $2",
      [req.user, `%${term}%`]
    );

    res.json(fishingReports.rows);
  } catch (err) {
    console.error(err.message);
  }
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
      "INSERT INTO fishing_report (user_id, created_at, spot, water_level, weather, type_of_fishing, bait, food, the_catch) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
      [
        req.user,
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

router.put("/fishing-reports/:id", authorization, async (req, res) => {
  try {
    const updatedFishingReport = await pool.query(
      "UPDATE fishing_report SET created_at = $1, spot = $2, water_level = $3, weather = $4, type_of_fishing = $5, bait = $6, food = $7, the_catch = $8 WHERE id = $9 AND user_id = $10 RETURNING *",
      [
        req.body.created_at,
        req.body.spot,
        req.body.water_level,
        req.body.weather,
        req.body.type_of_fishing,
        req.body.bait,
        req.body.food,
        req.body.the_catch,
        req.params.id,
        req.user,
      ]
    );
    res.status(200).json(updatedFishingReport.rows[0]);
  } catch (err) {
    res.status(503);
  }
});

router.delete("/fishing-reports/:id", authorization, async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM fishing_report WHERE id = $1 AND user_id = $2 RETURNING *",
      [req.params.id, req.user]
    );
    res.status(200).json("deleted");
  } catch (err) {
    res.status(503);
  }
});

router.get("/fishing-reports", async (req, res) => {
  const fishingReport = await pool.query("SELECT * FROM fishing_report");
  res.json(fishingReport.rows);
});

module.exports = router;
