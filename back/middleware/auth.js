const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   try {
      console.log('-------- début try ---------');
      console.log('-------- req.headers ---------',req.headers);
      console.log('==========',req.cookies
         );
         console.log('----req----',req.cookie);
      console.log('-------- req.headers.cookie ---------',req.headers.cookie.jwt);
      console.log('-------- req.headers.cookie ---------',req.headers.cookie.split('token='));
      if (req.cookies.token == undefined) {
        console.log('------ if req.headers.authorization');

         return res.status(403).json({ error});
      }else{
        const token = req.cookies.token; // récupère le token enregistré dans le cookie crée lors de la connexion
        console.log('------ token ==>', token);
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY); // verifie le token  grace à la clé secrète stockée dans la variable d'envionnement
      console.log('------ decodedToken -----', decodedToken);
      //console.log(decodedToken);
      const userId = decodedToken.userId;
      req.auth = {
         userId: userId,
      };
      
      if (token == '' || (req.body.userId && req.body.userId !== userId)) {
         console.log('------ if ------');
         throw res.status(403).json({ error: 'Not authorized----' });
      } else {
         console.log('-------- else ----------');
         next();
      }
      }
      
   } catch (error) {
      console.log('--------- catch ----------');
      res.status(401).json({ error });
      // res.clearCookie('token');
      // ------ remplacer par : revocation du token
      // return res.redirect('/');
   }
};
