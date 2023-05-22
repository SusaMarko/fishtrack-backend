require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("hello");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
