import { Sequelize, DataTypes } from "sequelize";

var StudentSubject_model;

module.exports = {

  StudentSubjects: function (context) {

     StudentSubject_model = context.define(
      "student_subjects",
      {
        // selfGranted: DataTypes.BOOLEAN,
        // id: {
        //   type: DataTypes.INTEGER,
        //   primaryKey: true,
        //   autoIncrement: true
        // },
        // student_id: {
        //   type: DataTypes.INTEGER,
        //   allowNull: false,
        //   references: {
        //     model: Students_model,
        //     key: 'id'
        //   }
        // },
        // subject_id: {
        //   type: DataTypes.INTEGER,
        //   allowNull: false,
        //   references: {
        //     model: Subject_model,
        //     key: 'id'
        //   }
        // },
        marks: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        grade: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      { timestamps: false }
    );
    return StudentSubject_model
  },
};

export default StudentSubject_model;


