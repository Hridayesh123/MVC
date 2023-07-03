export class StudentMapper {

  async ModelToDto(model: any): Promise<any> {

    const name = model.firstname + (model.middlename ? ` ${model.middlename}` : '') + ` ${model.lastname}`;
    var val= model;
    console.log(model);
    console.log(name);
    console.log(model.subjects);
      const studentSubjects = model.subjects;
    // console.log(studentSubjects)
      const subjects = [];

      studentSubjects.forEach((subject) => {
        const obj = {
        id: subject.id,
        code: subject.code,
        marks: subject.student_subjects.marks,
      }

      subjects.push(obj);
    });

      const responseBody = {
        id: model.id,
        name,
        address: model.address,
        subjects,
      };

      return responseBody;
   
  }
}
