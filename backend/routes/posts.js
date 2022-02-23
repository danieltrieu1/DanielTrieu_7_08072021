// Imports
const express = require('express')

const checkToken = require('../middleware/check')

const postCtrl = require('../controllers/post')

// const likeCtrl = require("../controllers/like")

// Récupération du router
let router = express.Router()

// Routage des ressources
// Ensemble des messages
router.get('/', postCtrl.getAllPosts)

// Message unique
router.get('/:id', postCtrl.getPost)

// Création du message
router.put('/', checkToken, postCtrl.createPost)
// router.post('/:id', checkToken, likeCtrl.likePost)

// Modification du message
router.patch('/:id', checkToken, postCtrl.updatePost)

// Suppression du message (Hard Delete)
router.delete('/:id', checkToken, postCtrl.deletePost)

module.exports = router