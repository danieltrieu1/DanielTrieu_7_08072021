// Imports
const express = require('express')

const checkToken = require('../middleware/checkToken')

const userCtrl = require('../controllers/user')

const multer = require('../middleware/multer-config')

// Récupération du router
let router = express.Router()

// Routage des ressources

// Ensemble des utilisateurs
router.get('/', checkToken, userCtrl.getAllUsers)

// Utilisateur unique
router.get('/:id', checkToken, userCtrl.getUser)

// Création de l'utilisateur 
router.put('/', checkToken, userCtrl.createUser)

// Modification l'utilisateur
router.patch('/:id', checkToken, multer, userCtrl.updateUser)

// Suppression de l'utilisateur (Hard Delete)
router.delete('/:id', checkToken, userCtrl.deleteUser)

module.exports = router
























//-------------------------------------------------------------------------------------------

// Soft Delete
// router.delete('/trash/:id', (req, res) => {
//     let userId = parseInt(req.params.id)

//     // Vérification du champ id
//     if(!userId){
//         return res.json(400).json({ message: 'Missing Parameter' })
//     }

//     // Suppression de l'utilisateur
//     User.destroy({ where: {id: userId} })
//         .then(() => res.status(204).json({ message: 'User Deleted' }))
//         .catch(error => res.status(500).json({ message: 'Database Error', error: error }))
// })

//-------------------------------------------------------------------------------------------

// Récupération des données supprimées (Soft Delete)
// router.post('/untrash/:id', (req, res) => {
//     let userId = parseInt(req.params.id)

//     // Vérification du champ id
//     if(!userId){
//         return res.json(400).json({ message: 'Missing Parameter' })
//     }

//     User.restore({ where: {id: userId} })
//         .then(() => res.status(204).json({}))
//         .catch(error => res.status(500).json({ message: 'Database Error', error: error }))
// })