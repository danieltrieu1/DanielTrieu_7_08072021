const app = require('./app')

// Import Connexion à la bdd
let DB = require('./db.config')

// Ecoute du serveur avec test DB
DB.authenticate()
    .then(() => console.log('Database Connection OK'))
    .then(() => { 
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Listening on Port ${process.env.SERVER_PORT}`);
        })
    })
    .catch(error => console.log('Database Error', error))