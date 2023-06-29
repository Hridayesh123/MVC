export class SubjectMapper {

    async ModelToDto(models: any): Promise<any> {
  
      var dtos = [];
  
      for (var m of models){
  
          var dto : any = {
                              id : m.id? m.id:1,
                              name : m.name,
                              code : m.code
                          };
          dtos.push(dto);
  
      };
      return dtos;
    }
  }
  