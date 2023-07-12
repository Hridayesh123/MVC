import { GenericService } from "./GenericService";
import { Repository } from "../repository/Repository";
import { query } from "express";
import { Query } from "express-serve-static-core";
import Subject_model from "../models/SubjectModel";
import { Sequelize } from "sequelize";
import Students_model from "../models/StudentsModel";
import StudentSubject_model from "../models/StudentSubjectsModel";

export class StudentService<T> extends GenericService<T> {
  protected dbContext: any;

  constructor(context) {
    var con = require("../models/StudentsModel").default(context);
    super(new Repository(con));

    this.dbContext = context;
    
  }

  
  async get(id_holder) {
    var result: Awaited<Promise<any>> = await this.repository.get(id_holder);

    return result;
  }

  async mark(studentid:any, sub_marks:any) {

    try {
      var query = 'SELECT trial(:studentid, :sub_marks)';
      const replacements = { studentid: studentid,  sub_marks: sub_marks };
  
      var marking = await this.repository.runFunction(query, replacements);
      return marking;
      }
     
     catch (err) {
      console.log(err);
    }
  }

  async stud_res(id: any) {

    var query = 'SELECT id, name, address, subject_id, subject_code, marks FROM stud_by_id(:id_holder)';
    var replacements= { id_holder : id};

    const studentDetails: Awaited<Promise<any>> =
      await this.repository.runFunction(query, replacements);

    return studentDetails;
  }
//id
    async exportCSV(id):Promise<any> {
    
    var query = 'SELECT * FROM exportData(:id_holder)';
    var replacements = { id_holder : id};
    
    var result = await this.repository.runFunction(query, replacements);
    return result[0];
  }
}

