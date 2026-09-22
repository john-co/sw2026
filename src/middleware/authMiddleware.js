const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../services/authService");

function authenticate(request, response, next) {
  const [scheme, token] = (request.headers.authorization || "").split(" ");

  if (scheme !== "Bearer" || !token) {
    return response.status(401).json({ error: "Bearer token is required" });
  }

  try {
    request.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (error) {
    return response.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = authenticate;
