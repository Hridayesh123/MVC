"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User_model = void 0;
const sequelize_1 = require("sequelize");
var User_model;
exports.User_model = User_model;
module.exports = {
    User: function (context) {
        var User_model = context.define("users", {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            firstname: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            lastname: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            datecreated: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            datemodified: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            secret_key: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            timestamps: false,
        });
    },
};
//# sourceMappingURL=UserModel.js.map