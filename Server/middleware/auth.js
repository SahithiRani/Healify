const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startswith("Bearer ")) {
    throw new UnauthenticatedError("No Token in Request");
  }

  // auth header = 'Bearer <Token>'
  const token = authHeader.split(" ")[1];

  try {
    const decoded = await jwt.verify(token.process.env.JWT_SECRET);
    const { _id, username } = decoded;

    // add user to request object
    req.user = { _id, username };
    next();
  } catch (err) {
    throw new UnauthenticatedError("Invalid Token");
  }
};

module.exports = authenticationMiddleware;
