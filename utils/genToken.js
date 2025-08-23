// utils/genToken.js
import jwt from 'jsonwebtoken';

/**
 * Generate JWT token
 * @param {string} userId - MongoDB user ID
 * @param {string} [expiresIn='30m'] - Token expiry duration
 * @returns {string} JWT token
 */
const genToken = (userId, expiresIn = '30m') => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn
  });
};

export default genToken;
