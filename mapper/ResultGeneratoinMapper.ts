
export class ResultGenerationMapper {

    async ModelToDto(model: any[]): Promise<any> {
      
      const subjects = {};
      const name = model[1].rows[0].name;
  
      for (const row of model[1].rows) {
        subjects[row.subject_code] = row.marks;
      }
  
      const marksArray = [];
      for (const [subjectCode, marks] of Object.entries(subjects)) {
        const markObj: any = {};
        markObj.subjectCode = marks;
        marksArray.push(markObj);
      }
  
      const totalMarks: any = Object.values(subjects).reduce(
        (total: number, marks: number) => total + marks,
        0
      );
      const number_of_subjects = Object.values(subjects).length;
      const gpa = (totalMarks / number_of_subjects) * 100;
  
      const responseBody = {
        Id: model[0].id,
        Name: name,
        GPA: gpa,
        Marks: marksArray,
      };
  
      return responseBody;
    }
  }
  