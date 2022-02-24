// Imports
const { Sequelize } = require('sequelize')
const DB = require('../db.config')

// Définition du modèle Commentaire
let Note = DB.define('Note', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // post_id: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         models: 'Posts',
    //         key: 'id'
    //     }
    // },
    title: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: ""
    },
    content: {
        allowNull: false,
        type: Sequelize.TEXT,
        defaultValue: ""
    },
    attachment: {
        allowNull: true,
        type: Sequelize.STRING
    }
    }
    , { classMethods: { associate: function(models) { models.Note.belongsTo(models.Post, {
        onDelete: "CASCADE" }) } } 
}
)

// // Synchronisation du modèles
Note.sync()
    .then(() => { console.log('NOTE DB SYNC OK') })

// Note.sync({ force: true })
//     .then(() => { console.log('FORCE NOTE DB SYNC OK') })

// Note.sync({ alter: true })
//     .then(() => { console.log('ALTER NOTE DB SYNC OK') })

module.exports = Note