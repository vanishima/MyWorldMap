const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token){
    res.status(401).json({valid: false, msg: "No token, authorization denied"});
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // Add user form payload
    req.user = decoded;

    next(); // call next piece of middlewa
  } catch (e){
    res.status(400).json({valid: false, msg: "Token is not valid"});
  }

}

module.exports = auth;