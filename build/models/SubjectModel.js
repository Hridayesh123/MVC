"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
var Subject_model;
module.exports = {
    Subject: function (context) {
        Subject_model = context.define("subjects", {
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
        return Subject_model;
    },
};
exports.default = Subject_model;
//# sourceMappingURL=SubjectModel.js.map