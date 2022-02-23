// Imports
const express = require('express')

const checkToken = require('../middleware/check')

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

// router.post('/:id/like', checkToken, likeCtrl.likeNote)

// Modification du commentaire
router.patch('/:id', checkToken, noteCtrl.updateNote)

// Suppression du commentaire (Hard Delete)
router.delete('/:id', checkToken, noteCtrl.deleteNote)

module.exports = router