import { Sequelize, DataTypes } from "sequelize";
import  Subject_model  from "./SubjectModel";
import  StudentSubject_model  from "./StudentSubjectsModel";

var Students_model;

module.exports = {
  Students: function (context) {

     Students_model = context.define(
      "students",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        middlename: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        lastname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email:{
          type:DataTypes.STRING,
          allowNull:false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      { timestamps: false }
    );

 
    
    return Students_model;
  },
};

export default Students_model;