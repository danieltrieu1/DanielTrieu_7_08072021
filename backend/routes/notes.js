// Imports
const express = require('express')

const checkToken = require('../middleware/checkToken')

const noteCtrl = require('../controllers/note')

// const likeCtrl = require("../controllers/like")

// Récupération du router
let router = express.Router()

// Routage des ressources
// Ensemble des commentaires
router.get('/', noteCtrl.getAllNotes)

// Commentaire unique
router.get('/:id', noteCtrl.getNote)

// Création du commentaire
router.put('/', checkToken, noteCtrl.createNote)

// Modification du commentaire
router.patch('/:id', checkToken, noteCtrl.updateNote)

// Suppression du commentaire (Hard Delete)
router.delete('/:id', checkToken, noteCtrl.deleteNote)

module.exports = router
