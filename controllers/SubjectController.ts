import { Request, Response } from "express";
import DbClient from "../config/db_config";
import { Connect } from "../common/Connect";
import { SubjectService } from "../services/SubjectService";
import { GenericService } from "../services/GenericService";
import { SubjectMapper } from "../mapper/SubjectMapper";

export class SubjectController{

  async getSubject(req: Request, res: Response): Promise<void> {

    try {

      const context = await Connect(); 

      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 5;
      const searchParam = (req.query.code as string) || "";
      

      var service = new GenericService(context);

      var result: any = await service.getAll(page, pageSize, searchParam)

      var mapper = new SubjectMapper();

      var dtos = mapper.ModelToDto(result);
      
      
      res.send(dtos);
    } catch (err) {
      console.log(err.message);
      res.send({  err });
    }
  }
  
   getSubjectsById(req: Request, res: Response): void {
    try{
   
    const context =  Connect();

    const id = parseInt(req.params.id);
    
    var service = new SubjectService(context);

    var result : any =  service.byID(id);

    res.send(result);
    } catch(err){
      console.log(err.message);
      res.send(err);
    }
  }
  
   createSubject(req: Request, res: Response): void {
    try{

    const context =  Connect();

    const name = req.body.name;
    const code = req.body.code;

    var service = new SubjectService(context);

    var result:any =  service.create(name,code);

    res.send(result);
      } catch(err){
    console.log(err.message);
    res.send(err);
      }
   }


   updateSubject(req: Request, res: Response): void {
    try{
    const context =  Connect();

    const id = parseInt(req.params.id);
    const name = req.body.name;
    const code = req.body.code;

    var service = new SubjectService(context);

    var result: any = service.update(id,name,code);
    res.send(result);
      } catch(err){
    console.log(err.message);
    res.send(err);
      }
    }

   deleteSubject(req: Request, res: Response): void {
    try{
    const context = Connect();

    const id = parseInt(req.params.id);

    var service = new SubjectService(context);

    var result:any = service.delete(id);
    
    }catch(err){
      console.log(err.message);
      res.send(err);
        }
  }
}
