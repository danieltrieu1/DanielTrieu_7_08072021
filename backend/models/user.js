// Imports
const { Sequelize } = require('sequelize')
const DB = require('../db.config')

// Définition du modèle User
const User = DB.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: ""
    },
    firstname: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: ""
    },
    email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    username: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: "",
        unique: true
    },
    description: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: ""
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING
        // is: /^[0-9a-f]{64}$/
    }
    ,
    isAdmin: {
    allowNull: false,
    type: Sequelize.BOOLEAN,
    defaultValue: false
    }
})

// Synchronisation du modèles
User.sync()
    .then(() => { console.log('USER DB SYNC OK') })

// User.sync({ force: true })
//     .then(() => { console.log('FORCE USER DB SYNC OK') })

// User.sync({ alter: true })
//     .then(() => { console.log('ALTER USER DB SYNC OK') })

module.exports = User