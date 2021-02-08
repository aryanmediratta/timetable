const jwt = require('jsonwebtoken');
const { secretToken } = require('../server/config');

exports.createJWT = (email, userId, duration) => {
  const payload = {
    email,
    userId,
    duration
  };
  return jwt.sign(payload, secretToken, {
    expiresIn: duration,
  });
};
