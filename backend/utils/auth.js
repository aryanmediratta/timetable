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

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, secretToken, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Verification Failed. Please Login Again.',
      });
    } else {
      next();
    }
  });
};
