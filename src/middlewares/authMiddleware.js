const authMiddleware = (req, res, next) => {
  console.log("Authentication middleware executed");

  const authHeader = req.headers.authorization;

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      error: "Invalid authorization format",
    });
  }
  console.log("Authorization header:", token);
  next();
};

module.exports = authMiddleware;
