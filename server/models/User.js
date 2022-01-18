const Card = require("./Card");
module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            // user, admin
            type: DataTypes.STRING,
            allowNull: true
        }
    }, { freezeTableName: true });

    User.associate = (models) => {
        User.hasMany(models.Card);
    };

    return User;
};