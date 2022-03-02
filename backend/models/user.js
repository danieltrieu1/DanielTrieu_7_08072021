module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define('User', {
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
        attachment: {
            allowNull: true,
            type: Sequelize.STRING,
            defaultValue: ""
        }
        ,
        isAdmin: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
        }
    })

    return User;

}


