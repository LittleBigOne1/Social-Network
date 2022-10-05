const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.token; // récupère le token enregistré dans le cookie
    //console.log(token)
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY); // verifie le token  grace à la clé secrète stockée dans la variable d'envionnement
    //console.log(decodedToken);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    
    // if decoded valid token next else
    next();
  } catch (error) {
    res.status(401).json({ error });
    res.clearCookie('token');
    return res.redirect('/');
  }
};

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.token; // récupère le token enregistré dans le cookie
    //console.log(token)
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY); // verifie le token  grace à la clé secrète stockée dans la variable d'envionnement
    //console.log(decodedToken);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    //console.log(req.auth.userId);
    // console.log(
    //  // '-----#auth.js------ USER ID =====>' + userId + '-------FIN---------'
    // );
    // if decoded valid token next else
    console.log();
    if (token == '' || (req.body.userId && req.body.userId !== userId)) {
      throw res.status(403).json({ error: 'Not authorized----' });
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error });
    res.clearCookie('token');
    return res.redirect('/');
  }
};
