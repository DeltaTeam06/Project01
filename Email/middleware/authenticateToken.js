const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {

  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).send({ status: 'error', msg: 'Access Denied: No Token Provided!' });
  }

  try {

    const verified = jwt.verify(token, 'No Key Is Secret');

    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send({ status: 'error', msg: 'Invalid Token' });
  }
};

module.exports = authenticateToken;
