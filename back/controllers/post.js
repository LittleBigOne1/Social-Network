const postModel = require('../models/post'); // import du modèle Post
const fs = require('fs'); // import du module file system, package qui permet de modifier et/ou supprimer des fichiers
const userModel = require('../models/user');

// export de la fonction de création d'un post

// export de la fonction de création d'un post
exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;
  delete postObject._userId;
  // si post sans img
  if (req.file) {
    const post = new postModel({
      // création d'objet post à partir du model Post
      ...postObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`,
    });

    post
      .save() // sauvegarde du post dans la base de donnée
      .then(() => {
        res.status(201).json({ message: 'Post crée !' });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } else {
    const post = new postModel({
      // création d'un objet post à partir du model Post
      ...postObject,
      userId: req.auth.userId,
    });

    post
      .save() // sauvegarde du post dans la base de donnée
      .then(() => {
        res.status(201).json({ message: 'Post crée !' });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  }
};

// export de la fonction d'affichage d'un post
exports.getOnePost = (req, res, next) => {
  postModel.findOne({ _id: req.params.id })
    .then((post) => {
      //console.log('------#controllers/post.js-------console log POST'+post);
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// export de la fonction de modification d'un post
exports.updatePost = (req, res, next) => {
  const postObject = req.file // ternaire pour vérifier si la requête contient un ficher ou non et effectué une action pour les deux possibilités
    ? {
        // si changement de photo:
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }; // si photo inchangée

  delete postObject._userId;
  // retourne le seul post ayant pour identifiant celui indiqué en paramètre
  userModel.findOne({ _id: req.auth.userId }).then((user) => {
    console.log('-----je suis le user-------' + user + '-----FIN------');
    postModel
      .findOne({ _id: req.params.id })
      .then((post) => {
        console.log('-----je suis le post-------' + post + '------FIN-----');
        if (post.userId === req.auth.userId || user.isAdmin === true) {
          // suppression de l'ancienne image (son fichier
          const filename = post.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, (error) => {
            if (error) throw error;
          });
          // mets à jour la base donnée en modifiant les caractéristiques ou l'image du post
          postModel
            .updateOne(
              { _id: req.params.id },
              { ...postObject, _id: req.params.id }
            )
            .then(() => res.status(200).json({ message: 'Objet modifié!' }))
            .catch((error) => res.status(401).json({ error }));
        } else {
          res.status(403).json({ message: 'Not authorized' });
        }
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  });
};

// export de la fonction d'affichage de tous les posts
exports.getAllPosts = (req, res, next) => {
  postModel
    .find() // méthode de récupération du tableau contenant l'ensemble des posts
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
// export de la fonction de suppression d'un post
exports.deletePost = (req, res, next) => {
  userModel.findOne({ _id: req.auth.userId }).then((user) => {
    // retourne le seul post ayant pour identifiant celui indiqué en paramètre
    postModel
      .findOne({ _id: req.params.id })
      .then((post) => {
        if (post.userId === req.auth.userId || user.isAdmin === true) {
          const filename = post.imageUrl.split('/images/')[1];
          // suppression de l'image puis
          fs.unlink(`images/${filename}`, () => {
            postModel
              .deleteOne({ _id: req.params.id })
              .then(() => {
                res.status(200).json({ message: 'Post supprimé !' });
              })
              .catch((error) => res.status(401).json({ error }));
          });
        } else {
          res.status(403).json({ message: 'Not authorized' });
        }
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  });
};
exports.likeOrNot = (req, res, next) => {
  // retourne le seul post ayant pour identifiant celui indiqué en paramètre
  postModel
    .findOne({ _id: req.params.id })
    .then((post) => {
      // si la personne like le post et qu'elle ne le like pas déjà:
      if (req.body.like === 1 && !post.usersLiked.includes(req.body.userId)) {
        // mets à jour la base donnée: +1 like sur le compteur et ajout l'id de l'utilisateur dans le tableau usersLiked
        postModel
          .updateOne(
            { _id: req.params.id },
            { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } }
          )
          .then(() =>
            res.status(201).json({ message: 'like added successfully' })
          )
          .catch((error) => res.status(400).json({ error }));
      }
      // si la persone veut annuler son like
      if (req.body.like === 0) {
        // si l'utilisateur avait liké:
        if (post.usersLiked.includes(req.body.userId)) {
          // mets à jour la base donnée: -1 like sur le compteur et retire l'id de l'utilisateur dans le tableau usersLiked
          postModel
            .updateOne(
              { _id: req.params.id },
              { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
            )
            .then(() =>
              res.status(201).json({ message: 'like removed successfully' })
            )
            .catch((error) => res.status(400).json({ error }));
          // si l'utilisateur avait disliké:
        }
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};