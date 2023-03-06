module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
           type : DataTypes.STRING,
           allowNull: false   
        },
        role: {
            type: DataTypes.ENUM('admin', 'client'),
            allowNull: false
        }
    },{ sequelize });
   return User
}
