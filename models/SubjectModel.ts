import { Sequelize, DataTypes } from "sequelize";
import { Model, Optional } from "sequelize";
import Students_model from "./StudentsModel";
import  StudentSubject_model  from "./StudentSubjectsModel";

var Subject_model;

module.exports = {
  
  Subject: function (context) {

     Subject_model = context.define(
      "subjects",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        code: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        timestamps: false,
      }
    );
    return Subject_model;
  },
};

export default Subject_model;
