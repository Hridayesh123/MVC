import { Sequelize, DataTypes, Model } from "sequelize";
import { StudentModel } from "./StudentsModel";
import { StudentSubjectModel } from "./StudentSubjectsModel";

export class SubjectModel extends Model {
  public id!: number;
  public name!: string;
  public code!: string;
}

export function initializeSubjectModel(sequelize: Sequelize): void {
  SubjectModel.init(
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
      code: {
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

export function associateSubjectModel(): void {
  SubjectModel.belongsToMany(StudentModel, {
    through: StudentSubjectModel,
    foreignKey: "subjectid",
    otherKey: "studentid",
  });
  StudentModel.belongsToMany(SubjectModel, {
    through: StudentSubjectModel,
    foreignKey: "studentid",
    otherKey: "subjectid",
  });
}

const construct = function (context) {
  initializeSubjectModel(context);
 
  return SubjectModel;
};

export default construct;
