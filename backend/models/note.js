// Définition du modèle Commentaire
module.exports = (sequelize, Sequelize) => {

    const Note = sequelize.define('Note', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // posts_id: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
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
    )
    return Note;
}
