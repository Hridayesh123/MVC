"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Students_model = void 0;
const sequelize_1 = require("sequelize");
const SubjectModel_1 = require("./SubjectModel");
const StudentSubjectsModel_1 = require("./StudentSubjectsModel");
var Students_model;
exports.Students_model = Students_model;
module.exports = {
    Students: function (context) {
        var Students_model = context.define("students", {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            firstname: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            middlename: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            lastname: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, { timestamps: false });
        Students_model.belongsToMany(SubjectModel_1.Subject_model, {
            through: StudentSubjectsModel_1.StudentSubject_model,
        });
        return Students_model;
    },
};
//# sourceMappingURL=StudentsModel.js.map