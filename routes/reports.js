const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const multer = require("multer")

const storage = multer.memoryStorage()
const uploads = multer({ storage })

router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT u.user_id, u.user_name, f.id, f.created_at, f.spot, f.water_level, f.weather, f.type_of_fishing, f.bait, f.food, f.the_catch, f.image FROM users AS u JOIN fishing_report AS f ON u.user_id = f.user_id"
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
      "SELECT * FROM fishing_report WHERE created_at || spot || water_level || weather || type_of_fishing || bait || food || the_catch LIKE $1",
      [`%${term}%`]
    );

    res.json(fishingReports.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/fishing-reports", authorization, uploads.single("image"), async (req, res) => {
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

    let image = req.file?.buffer;
    const newFishingReport = await pool.query(
      "INSERT INTO fishing_report (user_id, created_at, spot, water_level, weather, type_of_fishing, bait, food, the_catch, image) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
      [
        req.user,
        new Date(createdAt),
        spot,
        waterLevel,
        weather,
        typeOfFishing,
        bait,
        food,
        theCatch,
        image,
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
        req.body.createdAt,
        req.body.spot,
        req.body.waterLevel,
        req.body.weather,
        req.body.typeOfFishing,
        req.body.bait,
        req.body.food,
        req.body.theCatch,
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
    await pool.query("DELETE FROM comments WHERE fishing_report_id = $1", [
      req.params.id,
    ])
    const deletedFishingReport = await pool.query("DELETE FROM fishing_report WHERE id = $1 RETURNING *", [
      req.params.id,
    ]);
    res.status(200).json(deletedFishingReport);
  } catch (err) {
    res.status(503);
  }
});

router.get("/fishing-reports", async (req, res) => {
  const fishingReport = await pool.query("SELECT * FROM fishing_report");
  res.json(fishingReport.rows);
});

router.post(
  "/fishing-reports/:id/comments",
  authorization,
  async (req, res) => {
    try {
      const { createdAt, commentText, likes } = req.body;
      const newComment = await pool.query(
        "INSERT INTO comments (user_id, fishing_report_id, created_at, comment_text, likes) VALUES ($1,$2,$3,$4,$5) RETURNING *",
        [req.user, req.params.id, createdAt, commentText, likes]
      );
      res.status(201).json(newComment.rows[0]);
    } catch (err) {
      res.status(503);
    }
  }
);

router.delete("/comments/:id", authorization, async (req, res) => {
  try {
    const newComment = await pool.query(
      "DELETE FROM comments WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    res.status(201).json(newComment.rows[0]);
  } catch (err) {
    res.status(503);
  }
});

router.put("/comments/:id", authorization, async (req, res) => {
  try {
    const updatedComment = await pool.query(
      "UPDATE comments SET comment_text = $1 WHERE id = $2 RETURNING *",
      [req.body.commentText, req.params.id]
    );

    res.status(200).json(updatedComment.rows[0]);
  } catch (err) {
    res.status(503);
  }
});

router.get("/fishing-reports/:id/comments", authorization, async (req, res) => {
  try {
    const comments = await pool.query(
      "SELECT u.user_id, u.user_name, c.id, c.created_at, c.comment_text, c.likes FROM comments AS c JOIN users AS u ON c.user_id = u.user_id WHERE c.fishing_report_id = $1 ORDER BY c.created_at DESC",
      [req.params.id]
    );

    res.json(comments.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.put("/comments/:id/likes", authorization, async (req, res) => {
  try {
    pool.query("BEGIN");
    const currentComment = await pool.query(
      "SELECT likes FROM comments where id = $1",
      [req.params.id]
    );

    let newLikes = currentComment.rows[0].likes;

    if (req.query.increment === "true") {
      newLikes++;
    } else {
      newLikes--;
    }

    const updatedComment = await pool.query(
      "UPDATE comments SET likes = $1 WHERE id = $2 RETURNING *",
      [newLikes, req.params.id]
    );
    pool.query("COMMIT");

    res.status(200).json(updatedComment.rows[0]);
  } catch (err) {
    pool.query("ROLLBACK");
    res.status(503);
  }
});

module.exports = router;
