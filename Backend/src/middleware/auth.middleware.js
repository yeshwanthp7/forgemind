const { verifyAccessToken } = require('../utils/jwt');

/**
 * Middleware: Authenticate User via Bearer Access Token
 */
exports.authenticateUser = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = verifyAccessToken(token);

      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        name: decoded.name,
      };

      return next();
    } catch (error) {
      console.error('JWT Access Token Verification Error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Session expired or invalid access token. Please log in again.',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication failed. Access token is missing.',
    });
  }
};

/**
 * Middleware: Authorize Roles (RBAC)
 * @param  {...String} roles - Allowed enterprise roles
 */
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'This account does not have permission to access the selected workspace.',
      });
    }
    next();
  };
};

// Aliases for backwards compatibility
exports.protect = exports.authenticateUser;
exports.authorize = exports.authorizeRoles;
