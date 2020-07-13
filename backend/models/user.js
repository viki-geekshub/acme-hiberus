'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Token);
    User.hasMany(models.Movie);
  };
  return User;
};