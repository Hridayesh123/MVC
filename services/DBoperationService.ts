import { Repository } from "../repository/Repository";
import { GenericService } from "./GenericService";

export class DBoperationService<T> extends GenericService<T>{

    protected dbContext: any;

  constructor(context) {
    var con = require("../models/StudentsModel").default(context);
    super(new Repository(con));

    this.dbContext = context;
  }
    async operate(parsed_object : any){
        try{
        var query = 'SELECT parse(:parsedObject)';
        const replacements = {parsedObject : parsed_object }

        var operation = await this.repository.runFunction(query, replacements)
        return operation;}
        catch(err){
            console.log(err);
        }
        
    }
}