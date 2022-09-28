//multer pour gérer les requêtes HTTP avec envoi de fichier
const multer = require('multer');

const MIME_TYPES = {
  // dictionnaire d'extensions
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images'); // destination des images
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); // recupère le nom de l'image et remplace les espaces par des "_"
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension); //ajout d'un time stamp avant le nom orginal du fichier pour le rendre unique
  },
});

module.exports = multer({ storage: storage }).single('image'); // précise qu'on ne peut envoyer les fichiers que 1 par 1