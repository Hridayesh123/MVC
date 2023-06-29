"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seq = exports.Connect = exports.init_Sequelize = void 0;
const sequelize_1 = require("sequelize");
var seq = "";
exports.seq = seq;
function init_Sequelize() {
    exports.seq = seq = new sequelize_1.Sequelize("postgres", "postgres", "admin", {
        host: "localhost",
        dialect: "postgres",
    });
}
exports.init_Sequelize = init_Sequelize;
function Connect() {
    var context = seq;
    return context;
}
exports.Connect = Connect;
//# sourceMappingURL=Connect.js.map