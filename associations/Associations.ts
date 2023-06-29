import StudentSubject_model from "../models/StudentSubjectsModel";
import Students_model from "../models/StudentsModel";
import Subject_model from "../models/SubjectModel";


Students_model.belongsToMany(Subject_model, {
    through: StudentSubject_model,
  });

Subject_model.belongsToMany(Students_model, {
    through: StudentSubject_model,
  });