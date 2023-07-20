module.exports = (req, res, next) => {
  const { name, password } = req.body;

  function validName(userName) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userName);
  }

  if (req.path === "/login") {
    if (![name, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validName(name)) {
      return res.status(401).json("Invalid Name");
    }
  }

  next();
};
