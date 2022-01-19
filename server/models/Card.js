const User = require("./User");
const Sequelize = require('sequelize');

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
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        next_interval: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    }, { freezeTableName: true });
    
    return Card;
};