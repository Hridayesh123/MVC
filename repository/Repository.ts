import { seq } from "../common/Connect";
import { createObjectCsvWriter } from 'csv-writer';
import { IRepository } from "./interface/iRepository";
import Subject_model from "../models/SubjectModel";
import { Sequelize } from "sequelize";
import Students_model from "../models/StudentsModel";
import StudentSubject_model from "../models/StudentSubjectsModel";


export class Repository<T> implements IRepository<T> {
  private dbContext: any;

  constructor(context: any) {
    this.dbContext = context;
    console.log(this.dbContext);
  }

  async get(id_holder: any): Promise<any> {
    var result: any = await this.dbContext.findOne({
      where: { id: id_holder },
      include: [{ model: Subject_model, through: { attributes: ["marks"] } }],
    });
    return result;
  }

  
  async create(name: any, code: any): Promise<any> {
    try {
      await this.dbContext.create({
        name: name,
        code: code,
      });
      return "inserted";
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async byID(id): Promise<any> {
    var result = await this.dbContext.findOne({
      where: { id: id },
      raw: true, //to retrieve plain JSON object , for further processing set false(seq model instance)
    });

    return result;
  }

  async delete(id): Promise<any> {
    var result = await this.dbContext.destroy({
      where: { id: id },
    });
    return result ? result : "deleted";
  }

  async update(id, name, code): Promise<any> {
    var result = await this.dbContext.update(
      { name: name, code: code },
      { where: { id: id } }
    );
    return "updated";
  }

  // async stud_result(id): Promise<any>{

  //   const query =  `SELECT id, name, address, subject_id, subject_code, marks
  //   FROM stud_by_id(:id_holder)`;

  //   var result = await this.dbContext.query(query,{
  //     replacements :{
  //       id_holder: id
  //     }
  //   });
  //   return result;
  // }



  // async stud_result(id, query): Promise<any> {
  //   const replacements = {
  //     id_holder: id,
  //   };

  //   var result = await this.dbContext.sequelize.query(query, {
  //     replacements: replacements,
  //   });

  //   return result;
  // }

  async runFunction(query:string, replacements: any) {
    var result = await this.dbContext.sequelize.query(query, {
      replacements,
    });
    return result;
  }

  // async marking(studentid, query, sub_marks): Promise<any> {
  //   const replacements = { studentid: studentid,  sub_marks: sub_marks };
  
  //   await this.dbContext.sequelize.query(query, {
  //     replacements: replacements,
  //   });
  
  //   return "marks updated";
  // }

  // async getAll(page, pageSize, searchParam): Promise<any> {
  //   const replacements = { page:page , pageSize:pageSize, searchParam:searchParam}
  //   await this.dbContext.sequelize.query(query, {
  //     replacements:replacements
  //   });


    //*******************************/
    // const offset = (page - 1) * pageSize;

    // var result = await this.dbContext.findAll({
    //   limit: pageSize,
    //   offset,
    //   order: [["id", "ASC"]],
    // });
    // return result;
  //}
  

  async getAll( page: any, pageSize: any) {
   
    const offset =(page - 1) * pageSize;

    var result = await this.dbContext.findAll({
      limit: pageSize,
      offset,
      order: [["id", "ASC"]],
    });
    return result;

  }

  
}
