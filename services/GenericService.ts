import { IRepository } from "../repository/interface/iRepository";

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
