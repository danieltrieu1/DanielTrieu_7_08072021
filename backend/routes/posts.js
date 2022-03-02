// Imports
const express = require('express')

const checkToken = require('../middleware/checkToken')

const multer = require('../middleware/multer-config')

const postCtrl = require('../controllers/post')

// Récupération du router
let router = express.Router()

// Routage des ressources
router.get('/', checkToken, postCtrl.getAllPosts)

// Message unique
router.get('/:id', checkToken, postCtrl.getPost)

// Création du message
router.put('/', multer, postCtrl.createPost)

// Modification du message
router.patch('/:id', checkToken, postCtrl.updatePost)

// Suppression du message (Hard Delete)
router.delete('/:id', checkToken, postCtrl.deletePost)

module.exports = router