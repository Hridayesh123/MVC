import { Sequelize, DataTypes } from "sequelize";

var seq: any = "";

export function init_Sequelize() {
  seq = new Sequelize("postgres", "postgres", "admin", {
    host: "localhost",
    dialect: "postgres",
  });
}

export function Connect() {
  var context = seq;
  return context;
}

export {seq};
