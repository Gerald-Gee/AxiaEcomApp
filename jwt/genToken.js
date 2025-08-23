import jwt from 'jsonwebtoken';

// /**
//  * Generate JWT token (short-lived)
//  * @param {string} userId - MongoDB user ID
//  * @returns {string} JWT token
//  */
const getToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '5m' // short expiry for sensitive flows
  });
};

export default getToken;
