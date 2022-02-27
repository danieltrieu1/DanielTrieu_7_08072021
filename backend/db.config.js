// Imports
const Sequelize = require('sequelize')

// Connexion à la bdd
let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql"
    }
)

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.note = require('./models/note')(sequelize, Sequelize)
db.post = require('./models/post')(sequelize, Sequelize)
db.user = require('./models/user')(sequelize, Sequelize)

db.post.hasMany(db.note, {onDelete: 'CASCADE'})
db.note.belongsTo(db.post)

module.exports = db