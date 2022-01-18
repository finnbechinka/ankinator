
module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User", {
        username: {
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
    /*
    User.associate = (models) => {
        
    };
    */
    return User;
};