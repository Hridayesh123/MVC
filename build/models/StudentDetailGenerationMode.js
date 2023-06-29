"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    DetGen: function (context) {
        var StudentDetailsGeneration_model = context.define("get_student_details_by", {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            subject_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            subject_code: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            marks: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            timestamps: false,
        });
        return StudentDetailsGeneration_model;
    },
};
//# sourceMappingURL=StudentDetailGenerationMode.js.map