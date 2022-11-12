const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    if (req.cookies.token == null) {
      res.status(403).json({ error: 'Not authorized' });
    } else {
      const token = req.cookies.token;
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
      const userId = decodedToken.userId;
      req.auth = {
        userId: userId,
      };

      if (token == '' || (req.body.userId && req.body.userId !== userId)) {
        throw res.status(403).json({ error: 'Not authorized----' });
      } else {
        next();
      }
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};
