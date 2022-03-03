// Imports
const express = require('express')

const authCtrl = require('../controllers/auth')

const checkPassword = require('../middleware/password-validator');
const checkEmail = require("../middleware/email-validator");

// Récupération du router
let router = express.Router()

// Routage ressources Authentication
router.post('/signup', checkEmail, checkPassword, authCtrl.signup)
router.post('/login', authCtrl.login)

module.exports = router

