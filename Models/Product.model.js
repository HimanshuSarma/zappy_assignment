module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('products', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
           type : DataTypes.INTEGER,
           allowNull: false   
        }
    },{ sequelize });
   return Product
}

