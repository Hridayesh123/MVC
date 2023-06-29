export class StudentSubjectMapper {

    async ModelToDto(models: any): Promise<any> {
  
      var dtos = [];
  
      for (var m of models){
  
          var dto : any = {
                              id : m.id? m.id:1,
                              student_id : m.student_id,
                              subject_id: m.subject_id,
                              marks: m.marks,
                              grade: m.grade
                          };
          dtos.push(dto);
  
      };
      return dtos;
    }
  }
  