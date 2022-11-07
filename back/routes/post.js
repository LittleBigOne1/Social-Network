// import des dependences
const express = require('express'); // Import d'express
const router = express.Router(); // Import du router d'express

// import des middlewares
const auth = require('../middleware/auth'); // Import du middleware d'authenfication
const multer = require('../middleware/multer-config'); //Import du middleware de config de multer

// import des controlleurs
const postCtrl = require('../controllers/post');

// posts routes
router.get('/', auth, postCtrl.getAllPosts);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);
router.post('/:id/like', auth, postCtrl.likeOrNot);

module.exports = router;
