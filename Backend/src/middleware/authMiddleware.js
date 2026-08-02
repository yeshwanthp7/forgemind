const { authenticateUser, authorizeRoles, protect, authorize } = require('./auth.middleware');

const authMiddleware = (req, res, next) => {
  return authenticateUser(req, res, next);
};

authMiddleware.authenticateUser = authenticateUser;
authMiddleware.authorizeRoles = authorizeRoles;
authMiddleware.protect = protect;
authMiddleware.authorize = authorize;

module.exports = authMiddleware;
