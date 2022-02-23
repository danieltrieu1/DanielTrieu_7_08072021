// Imports
const { DataTypes } = require('sequelize')
const DB = require('../db.config')

// Définition du modèle User
const User = DB.define('User', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(100),
        defaultValue: ""
    },
    firstname: {
        allowNull: false,
        type: DataTypes.STRING(100),
        defaultValue: ""

    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    username: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: true
    },
    description: {
        allowNull: true,
        type: DataTypes.STRING(255),
        defaultValue: ""
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING(64),
        is: /^[0-9a-f]{64}$/
    }
    // ,
    // isAdmin: {
    // allowNull: false,
    // type: DataTypes.TINYINT,
    // defaultValue: false
    // }
})

// Synchronisation du modèles
User.sync()
    .then(() => { console.log('USER DB SYNC OK') })
// User.sync({ force: true })
// User.sync({ alter: true })


module.exports = User