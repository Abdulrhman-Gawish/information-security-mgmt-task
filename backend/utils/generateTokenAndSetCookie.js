const jwt = require("jsonwebtoken");

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000,
  });
  return token;
};

module.exports = generateToken;
