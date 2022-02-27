// Imports
const express = require('express')

// Imports des modules de routage
const userRouter = require('./routes/users')
const postRouter = require('./routes/posts')
const noteRouter = require('./routes/notes')

const authRouter = require('./routes/auth')

const dotenv = require('dotenv').config({ encoding: "latin1" })

// Sécurisation des en-têtes http: Préventions contre les attaques XSS
const helmet = require('helmet')

// Permet la gestion des requêtes vers le dossier /images
const path = require('path');

// Initialisation de l'API
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Paramétrage des en-têtes
// app.use(): permet d'attribuer un middleware à une route spécifique de l'application
app.use((req, res, next) => {

  // Permet l'accès à notre API depuis n'importe quelle origine "*"
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Permet l'ajout des en-têtes mentionnés aux requêtes envoyées vers l'API
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );

  // Permet l'envoi des requêtes avec les méthodes mentionnées
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
})

// Routage
app.get('/', (req, res) => res.send('<h1 style="color: green; width= 100%; height= 5rem">It works perfectly ! Good job !</h1>'))

app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/notes', noteRouter)

app.use('/auth', authRouter)

app.get('*', (req, res) => res.status(501).send('<h1 style="color: red;">What the hell are you doing ?!</h1>'))

// Gestion des fichiers images de manière statique
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app