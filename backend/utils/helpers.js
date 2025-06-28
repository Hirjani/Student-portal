const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const generateToken = (payload, options = { expiresIn: "30d" }) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        return reject(err);
      }
      resolve(token);
    });
  });
};

module.exports = {
  generateToken,
};
