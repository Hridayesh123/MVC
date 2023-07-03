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
    var con = require("../models/StudentsModel").Students(context);
    super(new Repository(con));

    this.dbContext = context;
  }

  async getAll(page: any, pageSize: any, searchParam: any): Promise<any> {
    var result: any = await this.repository.getAll(page, pageSize, searchParam);
    return result;
  }
  async get(id_holder) {
    var result: Awaited<Promise<any>> = await this.repository.get(id_holder);

    return result;
  }

  async mark(studentid:any, query:any ,sub_marks:any) {
    try {
      var marking = await this.repository.marking(studentid, query, sub_marks);
      return marking;
    } catch (err) {
      console.log(err);
    }
  }

  async stud_res(id: any, query: any) {
    const studentDetails: Awaited<Promise<any>> =
      await this.repository.stud_result(id, query);

    return studentDetails;
  }
}
