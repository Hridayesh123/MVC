"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subject_model = void 0;
const sequelize_1 = require("sequelize");
const StudentsModel_1 = require("./StudentsModel");
const StudentSubjectsModel_1 = require("./StudentSubjectsModel");
var Subject_model;
exports.Subject_model = Subject_model;
module.exports = {
    Subject: function (context) {
        var Subject_model = context.define("subjects", {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            code: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            timestamps: false,
        });
        Subject_model.belongsToMany(StudentsModel_1.Students_model, {
            through: StudentSubjectsModel_1.StudentSubject_model,
        });
    },
};
//# sourceMappingURL=SubjectModel.js.map