const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// temps en millisecondes, ici = 7 jours
const maxAge = 1000 * 60 * 60 * 24 * 7;

//const dotenv = require('dotenv');
//dotenv.config();

// inscription
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
      });
      //console.log(user);
      user
        .save() // stocke dans la base de donnée
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch((err) => res.status(400).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};
// connexion
exports.login = (req, res, next) => {
  userModel
    .findOne({ email: req.body.email })
    .then((user) => {
      //console.log(user);
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          ///////// test avec token DEBUT //////////////////////////////////
          const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
            expiresIn: maxAge,
          });
          res.cookie('token', token, {
            httpOnly: true,
            // secure: true,
            maxAge: maxAge,
            // signed : true,
          });
          res.status(200).json({ message: 'Connexion effectuée' });
          ///////// test avec token FIN //////////////////////////////////

          /**
          res.status(200).json({
            userId: user._id,
            // encode le user.id (1er argument) avec la clé secrète d'encryptage (2nd argument)
            token: jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
              expiresIn: '7d',
            }),
          }); */
        })
        .catch((error) => res.status(500).json(error + ' + pb avec le token'));
    })
    .catch((error) => res.status(500).json({ error }));
};

//
exports.logout = (req, res, next) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'déconnexion' });
  return res.redirect('/');
};