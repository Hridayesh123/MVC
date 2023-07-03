import  Subject_model  from "../models/SubjectModel";
import { Sequelize } from "sequelize";
import Students_model from "../models/StudentsModel";
import StudentSubject_model from "../models/StudentSubjectsModel";


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
