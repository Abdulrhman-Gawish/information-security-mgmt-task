const jwt = require("jsonwebtoken");

const generateToken = (payload, res) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });
  res.cookie("token", token, {
    httpOnly: true, // Prevents JavaScript access (security)
    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    sameSite: "strict", // Prevents CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });
  return token;
};

module.exports = generateToken;
