// Imports
const { DataTypes } = require('sequelize')
const DB = require('../db.config')

// Définition du modèle Commentaire
const Note = DB.define('Note', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    title: {
        allowNull: true,
        type: DataTypes.STRING,
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
    }, { classMethods: { associate: function(models) { models.Note.belongsTo(models.Post, {
        onDelete: "CASCADE", }) } } 
})

// Synchronisation du modèles
Note.sync()
    .then(() => { console.log('NOTE DB SYNC OK') })

// Note.sync({ force: true })
//     .then(() => { console.log('FORCE NOTE DB SYNC OK') })

// Note.sync({ alter: true })
//     .then(() => { console.log('ALTER NOTE DB SYNC OK') })

module.exports = Note