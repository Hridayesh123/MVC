import { Sequelize, DataTypes } from "sequelize";
import { Model, Optional } from "sequelize";

var User_model;

module.exports = {

  User: function (context) {

    var User_model = context.define("users",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        datecreated: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        datemodified: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        secret_key: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        timestamps: false,
      }
    );
  },
};

export {User_model};
