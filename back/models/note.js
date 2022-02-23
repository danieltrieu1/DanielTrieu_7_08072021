// Imports
const { DataTypes } = require('sequelize')
const DB = require('../db.config')

// Définition du modèle Message
const Note = DB.define('Note', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        allowNull: false,
        type: DataTypes.INTEGER(10)
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING(100),
        defaultValue: ""
    },
    content: {
        allowNull: false,
        type: DataTypes.TEXT,
        defaultValue: ""
    },
    attachment: {
        allowNull: true,
        type: DataTypes.STRING,
        defaultValue: ""
    }
    // ,
    // like: {
    //     allowNull: false,
    //     type: DataTypes.INTEGER
    // }
})

// Synchronisation du modèles
Note.sync()
    .then(() => { console.log('NOTE DB SYNC OK') })
// Note.sync({ force: true })
// Note.sync({ alter: true })

module.exports = Note