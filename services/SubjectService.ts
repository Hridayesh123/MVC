import { GenericService } from "./GenericService";
import { Repository } from "../repository/Repository";
import  Subject_model  from "../models/SubjectModel";
import { Sequelize } from "sequelize";
import Students_model from "../models/StudentsModel";
import StudentSubject_model from "../models/StudentSubjectsModel";
const construct = require("../models/SubjectModel");
export class SubjectService<T> extends GenericService<T>{

    protected dbContext : any;

    constructor(context){
        var con = construct.Subject(context);
        super(new Repository(con));

        this.dbContext = context;
    }

    async create(name, code){

         await this.repository.create(name,code);
        return  "created/ inserted";
    }

    async getAll(page, pageSize, searchParam){

        var result : any = await this.repository.getAll(page,pageSize,searchParam);
        return result;
   
//    const allSubjects = await this.dbContext.query(
//      "SELECT * FROM getALLSubjects(:searchParam, :page, :pageSize);",
//      {       
   //   **************DATABASE FUNCTION IMPLEMENTATION BATA AS OPPOSED TO SEQ FUNCTION************
//        replacements: {
//          searchParam: searchParam,
//          page: page,
//          pageSize: pageSize,
//        },
//      });
//     return allSubjects;
    }

    async byID(id){
        const getByID = await this.repository.byID(id);
        return getByID;
     }

    async delete(id){

        var deletion = await this.repository.delete(id);
        return deletion? deletion: "subject deleted";
    }

    async update(id,name,code){

        var updating = await this.repository.update(id,name,code);

        return updating? updating : "subject updated";
    }
}