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
     // '-----#auth.js------ USER ID =====>' + userId + '-------FIN---------'
    );
    // if decoded valid token next else 
    next();
  } catch (error) {
    res.status(401).json({ error });
    res.clearCookie('token');
    return res.redirect('/');
  }
};
