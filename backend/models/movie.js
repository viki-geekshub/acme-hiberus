'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    movieId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    rating: DataTypes.FLOAT
  }, {});
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsTo(models.User);
  };
  return Movie;
};