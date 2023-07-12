import { Sequelize, DataTypes, Model } from "sequelize";
import { SubjectModel } from "./SubjectModel";
import { StudentSubjectModel } from "./StudentSubjectsModel";

export class StudentModel extends Model {
  public id!: number;
  public name!: string;
  public address!: string;
}

export function initializeStudentModel(sequelize: Sequelize): void {
  StudentModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      
    }
  );
}

export function associateStudentModel(): void {
  StudentModel.belongsToMany(SubjectModel, {
    through: StudentSubjectModel,
    foreignKey: "studentid",
    otherKey: "subjectid",
  });
  SubjectModel.belongsToMany(StudentModel, {
    through: StudentSubjectModel,
    foreignKey: "subjectid",
    otherKey: "studentid",
  });
}

const construct = function (context) {
  initializeStudentModel(context);
  
  return StudentModel;
};

export default construct;
