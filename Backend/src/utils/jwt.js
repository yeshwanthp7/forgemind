const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'forgemind_sentinel_access_jwt_secret_key_2026';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'forgemind_sentinel_refresh_jwt_secret_key_2026';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '15m';
const JWT_REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE || '7d';

/**
 * Generate Access Token
 * @param {Object} payload - User identification payload
 * @returns {String} Signed JWT access token
 */
exports.generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
};

/**
 * Generate Refresh Token
 * @param {Object} payload - User identification payload
 * @returns {String} Signed JWT refresh token
 */
exports.generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRE,
  });
};

/**
 * Verify Access Token
 * @param {String} token - Bearer access token
 * @returns {Object} Decoded payload
 */
exports.verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

/**
 * Verify Refresh Token
 * @param {String} token - Refresh token
 * @returns {Object} Decoded payload
 */
exports.verifyRefreshToken = (token) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};

exports.JWT_SECRET = JWT_SECRET;
exports.JWT_REFRESH_SECRET = JWT_REFRESH_SECRET;
