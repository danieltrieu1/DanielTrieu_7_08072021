const jwt = require('jsonwebtoken')

// Extraction du token 

// Vérification de la présence du token
const checkToken = (req, res, next) => {

    const token = req.headers.authorization 

    if(!token){
        return res.status(401).json({ message: 'You have not access to this content !'})
    }

    // Vérifier la validité du token
    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
        if(error){
            return res.status(401).json({ message: 'Wrong token' })
        }

        req.token = decodedToken.id

        next()
    })
}

module.exports = checkToken