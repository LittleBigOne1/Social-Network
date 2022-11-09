const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const PostsRoutes = require('./routes/post');
const path = require('path'); // module qui permet de travailler avec des répertoires et des chemins de fichiers
const helmet = require('helmet'); // module qui aide à sécuriser les en-têtes HTTP
const dotenv = require('dotenv'); // module sans dépendance qui charge les variables d'environnement dans un fichier .env
dotenv.config();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
};
// connexion à MongoDB

mongoose
  .connect(process.env.MDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use(express.json());
// app.use(dotenv)

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use('/images', express.static(path.join(__dirname, 'images'))); // /Défini le chemin du dossier où les fichiers sont stockés une fois importés
app.use('/api/auth', userRoutes);
app.use('/api/posts', PostsRoutes);

module.exports = app;
