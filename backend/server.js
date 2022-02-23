// Imports
const express = require('express')
const cors = require('cors')

const checkToken = require('./middleware/check')

// Import Connexion à la bdd
let DB = require('./db.config')

// Initialisation de l'API
const app = express()

app.use(express.json())
app.use(cors())

// Sécurisation des en-têtes http: Préventions contre les attaques XSS
const helmet = require('helmet');

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
});
app.use(express.urlencoded({ extended: true }))

// Imports des modules de routage
const userRouter = require('./routes/users')
const postRouter = require('./routes/posts')
const noteRouter = require('./routes/notes')

const authRouter = require('./routes/auth')

// Routage
app.get('/', (req, res) => res.send('<h1 style="color: green; width= 100%; height= 5rem">It works perfectly ! Good job !</h1>'))

app.use('/users', checkToken, userRouter)
app.use('/posts', postRouter)
app.use('/notes', noteRouter)

app.use('/auth', authRouter)

app.get('*', (req, res) => res.status(501).send('<h1 style="color: red;">What the hell are you doing ?!</h1>'))


// Ecoute du serveur avec test DB
DB.authenticate()
    .then(() => console.log('Database Connection OK'))
    .then(() => { 
        app.listen(process.env.PORT, () => {
            console.log(`Listening on Port ${process.env.PORT}`);
        })
    })
    .catch(error => console.log('Database Error', error))


