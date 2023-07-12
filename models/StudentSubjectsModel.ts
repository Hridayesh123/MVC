import { Sequelize, DataTypes, Model } from "sequelize";
import { StudentModel } from "./StudentsModel";
import { SubjectModel } from "./SubjectModel";

export class StudentSubjectModel extends Model {
  public studentid!: number;
  public subjectid!: number;
  public marks!: number;
  
}

export function initializeStudentSubjectModel(sequelize: Sequelize): void {
  StudentSubjectModel.init(
    {
      studentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: StudentModel,
          key: "id",
        },
      },
      subjectId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: SubjectModel,
          key: "id",
        },
      },
      marks: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    
    },
    {
      sequelize,
      timestamps: false,
     
    }
  );
}

const construct = function (context) {
  initializeStudentSubjectModel(context);
  return StudentSubjectModel;
};

export default construct;
