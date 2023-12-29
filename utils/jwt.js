const jwt = require("jsonwebtoken");
const config = require("../config/env");

async function generateToken(payload) {
  const generatedToken = jwt.sign(payload, config.ACCESSTOKEN_SECRET, { expiresIn: '1h' });
  return generatedToken;
}

async function verifyToken(generatedToken) {
  return jwt.verify(generatedToken, config.ACCESSTOKEN_SECRET);
}

module.exports = {
  generateToken,
  verifyToken
}