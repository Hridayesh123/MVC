"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
var Students_model;
module.exports = {
    Students: function (context) {
        Students_model = context.define("students", {
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
        return Students_model;
    },
};
exports.default = Students_model;
//# sourceMappingURL=StudentsModel.js.map