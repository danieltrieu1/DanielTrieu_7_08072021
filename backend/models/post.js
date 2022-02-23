// Imports
const { DataTypes } = require('sequelize')
const DB = require('../db.config')

// Définition du modèle Message
const Post = DB.define('Post', {
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
    }, { classMethods: { associate: function(models) { models.Post.hasMany(models.Note) } } 
})

// Synchronisation du modèles
Post.sync()
    .then(() => { console.log('POST DB SYNC OK') })

// Post.sync({ force: true })
//     .then(() => { console.log('FORCE POST DB SYNC OK') })

// Post.sync({ alter: true })
//     .then(() => { console.log('ALTER POST DB SYNC OK') })

module.exports = Post