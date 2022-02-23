// Imports
const { DataTypes } = require('sequelize')
const DB = require('../db.config')

// Définition du modèle User
const User = DB.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        allowNull: true,
        type: DataTypes.STRING,
        defaultValue: ""
    },
    firstname: {
        allowNull: true,
        type: DataTypes.STRING,
        defaultValue: ""
    },
    email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    username: {
        allowNull: true,
        type: DataTypes.STRING,
        unique: true
    },
    description: {
        allowNull: true,
        type: DataTypes.STRING,
        defaultValue: ""
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
        is: /^[0-9a-f]{64}$/
    }
    ,
    isAdmin: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
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