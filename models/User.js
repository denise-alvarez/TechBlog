const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {}

User.init( 
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4, 15],
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 15]
        }
      } 
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
});

User.beforeCreate(async newUser => {
    newUser.password = await bcrypt.hash(newUser.password, 10);
});

module.exports = User;