module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define('logs', {
        entity: {
            type: DataTypes.ENUM('products', 'users'),
            allowNull: false,
        },
        description: {
           type : DataTypes.STRING,
           allowNull: false   
        }
    },{ sequelize });
   return Log
}