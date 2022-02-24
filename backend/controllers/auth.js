const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')


// Signup
exports.signup = (req, res, next) => {

    // .hach(): Hachage du mot de passe / "Salage" = 10
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()

          // Statut 201 - Created: indique que la requête a réussie et que la ressource a été créée.
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))

          // Statut 400 - Bad Request: indique que la syntaxe de la requête est invalide
          .catch(error => res.status(400).json({ error }));
      })

      // Statut 500 - Internal Server Error: indique une erreur interne du serveur non identifiée
      .catch(error => res.status(500).json({ error }));
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body

    if( !email || !password ) {
        return res.status(400).json({ Message: 'Wrong Email or Password' })
    }

    try {
        // Vérification de l'existence de l'utilisateur
        let user = await User.findOne({ where: { email: email }, raw: true })
        if (user === null) {
            return res.status(401).json({ message: 'This account does not exit !' })
        }

        // Vérification du mot de passe
        let valid = await bcrypt.compare(password, user.password)
        if (!valid) {
            return res.status(401).json({ message: 'Wrong Password' }) 
        }

        // Génération du token
                            // Payload
                            const token = jwt.sign(
                        
                                {
                                id: user.id,
                                name: user.name,
                                firstname: user.firstname,
                                email: user.email,
                                // isAdmin: user.isAdmin,
                                username: user.username
                                },
                                
                                // Chaîne secrète d'encodage du token
                                process.env.JWT_SECRET,
            
                                // Durée de validité du token: l'utilisateur devra se reconnecter
                                { expiresIn: process.env.JWT_DURING }
            
                                ) 
                                return res.json({ access_token: token })


    } catch(error) {
        if(error.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: error })
        }
        res.status(500).json({ message: 'Login process failed', error: error })
    }
}