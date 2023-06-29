import { GenericService } from "./GenericService";
import { Repository } from "../repository/Repository";

export class StudentService<T> extends GenericService<T>{

    protected dbContext : any;

    constructor(context){
        var con = require("../models/StudentsModel").Students(context);
        super(new Repository(con));

        this.dbContext = context;
        
    }

    async getAll(page: any, pageSize: any, searchParam: any): Promise<any> {
      var result : any = await this.repository.getAll(page,pageSize,searchParam);
        return result;
    }

    async get(id_holder){
        
        var result: Awaited<Promise<any>> = await this.repository.get(id_holder);

        return result;
    }

    async mark(studentid, sub_marks){

        var marking  = await this.dbContext.query(
            `SELECT update_student_subjects(:studentid, :sub_marks)`,
            {
              replacements: { studentid: studentid, sub_marks: sub_marks },
            });
            return marking? marking: "marks updated";
    }

    async stud_res(id){
        const studentDetails: Awaited<Promise<any>> = await this.repository.stud_result(id);
          
          return studentDetails;
      
    }

    
}