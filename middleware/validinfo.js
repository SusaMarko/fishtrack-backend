module.exports = (req, res, next) => {
  const { name, password } = req.body;

  if (req.path === "/login") {
    if (![name, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    }
  }

  next();
};
