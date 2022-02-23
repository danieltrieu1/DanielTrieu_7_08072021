// Imports
const express = require('express')

const userCtrl = require('../controllers/user')

// Récupération du router
let router = express.Router()

// Routage des ressources

// Ensemble des utilisateurs
router.get('/', userCtrl.getAllUsers)

// Utilisateur unique
router.get('/:id', userCtrl.getUser)

// Création de l'utilisateur
router.put('/', userCtrl.createUser)

// Modification l'utilisateur
router.patch('/:id', userCtrl.updateUser)

// Suppression de l'utilisateur (Hard Delete)
router.delete('/:id', userCtrl.deleteUser)

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