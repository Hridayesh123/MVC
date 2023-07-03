import { IRepository } from "../repository/interface/iRepository";
import { Repository } from "../repository/Repository";
import  Subject_model  from "../models/SubjectModel";
import { Sequelize } from "sequelize";
import Students_model from "../models/StudentsModel";
import StudentSubject_model from "../models/StudentSubjectsModel";

export class GenericService<T> {

    protected repository : IRepository<T>;

    constructor(repository : IRepository<T>){
        this.repository = repository;
    }

    
    async getAll(page, pageSize, searchParam){

        var result : any = await this.repository.getAll(page,pageSize,searchParam);
        return result;
 }
}
