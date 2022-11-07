const postModel = require('../models/post'); // import du modèle Post
const fs = require('fs'); // import du module file system, package qui permet de modifier et/ou supprimer des fichiers
const userModel = require('../models/user');

// export de la fonction de création d'un post
exports.createPost = (req, res) => {
  const postObject = req.body;
  if (req.file) {
    console.log('IF REQ.FILE');
    const post = new postModel({
      ...postObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`,
    });
    post
      .save()
      .then(() => {
        res.status(201).json({ message: 'Post crée !' });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } else {
    console.log('REQ.FILE = FALSE');
    const post = new postModel({
      ...postObject,
    });

    post
      .save()
      .then(() => {
        res.status(201).json({ message: 'Post crée !' });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  }
};

// export de la fonction de modification d'un post

exports.updatePost = (req, res) => {
  const postObject = req.file
    ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  req.file &&
    postModel.findOne({ _id: req.params.id }).then((post) => {
      console.log('POST ======>', post);
      if (post.imageUrl) {
        const filename = post.imageUrl.split('/images/')[1];
        console.log(filename);
        fs.unlink(`images/${filename}`, (error) => {
          if (error) throw error;
        });
      }
    });

  postModel
    .updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(201).json({ message: 'Post updated' }))
    .catch((error) => {
      res.status(400).json({ error });
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
      console.log('========CATCH get all post ========');
      res.status(400).json({ error: error });
    });
};
// export de la fonction de suppression d'un post
exports.deletePost = (req, res, next) => {
  userModel.findOne({ _id: req.auth.userId }).then((user) => {
    // retourne le seul post ayant pour identifiant celui indiqué en paramètre
    postModel
      .findOne({ _id: req.params.id })
      .then((post) => {
        console.log('----- post -------', post);
        console.log('----- req.auth.userId -------', req.auth.userId);
        if (post.userId === req.auth.userId || user.isAdmin) {
          if (post.imageUrl) {
            const filename = post.imageUrl.split('/images/')[1];
            console.log('-------- filename --------', filename);
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
            postModel
              .deleteOne({ _id: req.params.id })
              .then(() => {
                res.status(200).json({ message: 'Post supprimé !' });
              })
              .catch((error) => res.status(401).json({ error }));
          }
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
  // console.log(req);
  console.log('------- je suis dans la fonction like ------');
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
              {
                $inc: { likes: -1 },
                $pull: { usersLiked: req.body.userId },
              }
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