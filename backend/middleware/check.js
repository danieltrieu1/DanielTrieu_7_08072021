// Import
const jwt = require('jsonwebtoken')

// Extraction du token 
const extractBearer = authorization => {
 
    if(typeof authorization !== 'string'){
        return false
    }

    // Isolation du token
    const matches = authorization.match(/(bearer)\s+(\S+)/i)

    return matches && matches[2]

}

// Vérification de la présence du token 
const checkToken = (req, res, next) => {

    const token = req.headers.authorization && extractBearer(req.headers.authorization)

    if(!token){
        return res.status(401).json({ message: 'Sorry you cannot see this !'})
    }

    // Vérification de la validité du token
    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
        if(error){
            return res.status(401).json({ message: 'Wrong Token' })
        }

        next()
    })
}

module.exports = checkToken

//---------------------------------------------------------------------------

//test raté

// // Package permettant de créer et vérifier un token d'authentificaton
// const jwt = require('jsonwebtoken')

// const checkToken = (req, res, next) => {
//   try {

//     // Extraction du token contenu dans le header Authorization (/Authentication)
//     // .split(): Bearer / Récupération du contenu après l'espace
//     const token = req.headers.authorization.split(' ')[1];

//     // .verify(): Décodage du token -> Renverra une erreur si celui-ci n'est pas valide
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

//     // Extraction de l'id contenu dans le token
//     const userId = decodedToken.userId;

//     req.auth = { userId };  

//     // Comparaison de l'id de l'utilisateur avec celui extrait du token
//     if (req.body.userId && req.body.userId !== userId) {

//       throw 'Invalid user ID';
      
//     } else {

//       // Exécution de l'authentification
//       next();
//     }
  
//   } catch {
//     res.status(401).json({
//       error: new Error('Invalid Request')
//     })
//   }
// };

// module.exports = checkToken




// module.exports = (req, res, next) => {
//     try {
  
//       // Extraction du token contenu dans le header Authorization
//       // .split(): Bearer / Récupération du contenu après l'espace
//       const token = req.headers.authorization.split(' ')[1];
  
//       // .verify(): Décodage du token -> Renverra une erreur si celui-ci n'est pas valide
//       const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  
//       // Extraction de l'id contenu dans le token
//       const userId = decodedToken.userId;
  
//       req.auth = { userId };  
  
//       // Comparaison de l'id de l'utilisateur avec celui extrait du token
//       if (req.body.userId && req.body.userId !== userId) {
  
//         throw 'Invalid user ID';
        
//       } else {
  
//         // Exécution de l'authentification
//         next();
//       }
    
//     } catch {
//       res.status(401).json({
//         error: new Error('Invalid request!')
//       });
//     }
//   };