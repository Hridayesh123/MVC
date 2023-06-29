import { Sequelize, DataTypes } from "sequelize";

module.exports = {

  DetGen: function (context) {

    var StudentDetailsGeneration_model = context.define(
      "get_student_details_by",
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        subject_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        subject_code: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        marks: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        timestamps: false,
      }
    );
    return StudentDetailsGeneration_model;
  },
};
