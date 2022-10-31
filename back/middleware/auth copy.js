const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   try {
      console.log('-------- début try ---------');
      const token = req.headers.authorization.split(' ')[1]; // récupère le token enregistré dans le cookie crée lors de la connexion
      console.log('------ token ==>', token);
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY); // verifie le token  grace à la clé secrète stockée dans la variable d'envionnement
      console.log('------ decodedToken -----', decodedToken);
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
         console.log('------ if ------');
         throw res.status(403).json({ error: 'Not authorized----' });
      } else {
         console.log('-------- else ----------');
         next();
      }
   } catch (error) {
      console.log('--------- catch ----------');
      res.status(401).json({ error });
      // res.clearCookie('token');
      // ------ remplacer par : revocation du token
      // return res.redirect('/');
   }
};
