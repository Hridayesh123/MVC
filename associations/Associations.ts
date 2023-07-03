import  Subject_model  from "../models/SubjectModel";
import { Sequelize } from "sequelize";
import Students_model from "../models/StudentsModel";
import StudentSubject_model from "../models/StudentSubjectsModel";

Students_model.belongsToMany(Subject_model, {
    through: StudentSubject_model,
  });

Subject_model.belongsToMany(Students_model, {
    through: StudentSubject_model,
  });