const express = require('express'); // Import d'express
const router = express.Router(); // Import du router d'express

const auth = require('../middleware/auth'); // Import du middleware d'authenfication
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/logout', auth, userCtrl.logout);

module.exports = router;