// Imports
const express = require('express')

const authCtrl = require('../controllers/auth')

// Récupération du router
let router = express.Router()

// Routage ressources Authentication
router.post('/signup', authCtrl.signup)
router.post('/login', authCtrl.login)

module.exports = router

