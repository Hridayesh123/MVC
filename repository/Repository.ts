import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import { IRepository } from "./interface/iRepository";
import  Subject_model  from "../models/SubjectModel";

export class Repository<T> implements IRepository<T> {
  private dbContext: any;

  constructor(context: any) {
    this.dbContext = context;
  }

  async get(id_holder: any): Promise<any> {
    var result: any = await this.dbContext.findOne({
      where: { id: id_holder },
      include: [{ model: Subject_model, through: { attributes: ["marks"] } }],
    });
    return result;
  }

  async getAll(page: any, pageSize: any, searchParam: any): Promise<any> {

    const offset = (page - 1) * pageSize;
    try{
    var result = await this.dbContext.findAll({
      limit: pageSize,
      offset,
      order: [["id", "ASC"]],
    });
    return result;
  }catch(err){
    console.log(err.message);
    throw err;
  }
}

  async create(name : any,code: any): Promise<any> {
    var result =await this.dbContext.create({
      name: name,
      code: code,
    }).then(result =>{
      return result? result : "inserted";
    });
   
  }

  async byID(id): Promise<any>{
    var result = await this.dbContext.findOne({
      where: { id: id },
      raw: true  //to retrieve plain JSON object , for further processing set falase(seq model instance)
    });
  }

  async delete(id): Promise<any>{
    var result = await this.dbContext.destroy({
      where: {id : id}
    });
    return result? result: "deleted";
  }

  async update(id, name, code): Promise<any>{
    var result = await this.dbContext.update(
      {name:name , code:code},
      {where: {id:id}}
    );
    return "updated";
  }

  async stud_result(id): Promise<any>{

    const query =  `SELECT id, name, address, subject_id, subject_code, marks
    FROM stud_by_id(:id_holder)`;

    var result = await this.dbContext.query(query,{
      replacements :{
        id_holder: id
      }
    });
    return result;  
  }
  
}
