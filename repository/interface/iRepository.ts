import { Query } from "express-serve-static-core";

export interface IRepository<T> {

    get(id_holder: any): Promise<T>;

    getAll( page:any, pageSize:any);
    
    create(name: any, code: any): Promise<T>;

    byID(id:any): Promise<T>;

    delete(id:any):Promise<T>;

    update(id:any, name:any, code:any):Promise<T>;

    runFunction(query: any, replacements: any);

    



}