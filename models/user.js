"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users", // 指定資料表名稱，根據你的資料表名稱進行調整
    }
  );

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Todo);
  };

  return User;
};
