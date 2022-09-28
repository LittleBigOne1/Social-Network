const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    ///////// test avec token DEBUT //////////////////////////////////
    const token = req.cookies.token;// récupère le token enregistré dans le cookie
    //console.log(token)
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY); // verifie le token  grace à la clé secrète stockée dans la variable d'envionnement
    //console.log(decodedToken);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    console.log(
      '-----#auth.js------ USER ID =====>' + userId + '-------FIN---------'
    );
    ///////// test avec token FIN //////////////////////////////////
    /**
    const token = req.headers.authorization.split(' ')[1]; // Recupere le token du header créé par le login
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY); // verifie le token  grace à la clé secrète stockée dans la variable d'envionnement
    //console.log(decodedToken);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
     */
    next();
  } catch (error) {
    res.status(401).json({ error });
    res.clearCookie('token');
    return res.redirect('/');
  }
};
