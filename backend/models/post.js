module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('Post', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // user_id: {
        //     allowNull: false,
        //     type: DataTypes.INTEGER
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
            type: Sequelize.STRING,
            defaultValue: ""
        }
    })

return Post;

}


