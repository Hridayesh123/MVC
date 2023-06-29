"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentSubject_model = void 0;
const sequelize_1 = require("sequelize");
var StudentSubject_model;
exports.StudentSubject_model = StudentSubject_model;
module.exports = {
    StudentSubjects: function (context) {
        var StudentSubject_model = context.define("student_subjects", {
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
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            grade: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
        }, { timestamps: false });
        return StudentSubject_model;
    },
};
//# sourceMappingURL=StudentSubjectsModel.js.map