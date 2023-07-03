import { Query } from "express-serve-static-core";

export interface IRepository<T> {

    get(id_holder: any): Promise<T>;

    getAll(page : any, pageSize: any,searchParam: any): Promise<T>;

    create(name: any, code: any): Promise<T>;

    byID(id:any): Promise<T>;

    delete(id:any):Promise<T>;

    update(id:any, name:any, code:any):Promise<T>;

    stud_result(id: any, query:any):Promise<T>;

    marking(studentid: any, query:any, sub_marks:any):Promise<T>;

    // generateResult(req: Request, res: Response): Promise<void>;

    // getSubject(req: Request, res: Response): Promise<void>;

    // getSubjectsById(req: Request, res: Response): void;

    // createSubject(req: Request, res: Response): void;

    // updateSubject(req: Request, res: Response): void;

    // deleteSubject(req: Request, res: Response): void;

}