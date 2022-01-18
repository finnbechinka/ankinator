const User = require("./User");

module.exports = (sequelize, DataTypes) => {

    const Card = sequelize.define("Card", {
        front: {
            type: DataTypes.STRING,
            allowNull: false
        },
        back: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_viewed: {
            type: DataTypes.DATE,
            allowNull: true
        },
        next_interval: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, { freezeTableName: true });
    
    return Card;
};