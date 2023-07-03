import { Connect, init_Sequelize } from "../common/Connect";
import { Request, Response, query } from "express";
import { GenericService } from "../services/GenericService";
import { StudentMapper } from "../mapper/StudentMapper";
import { ResultGenerationMapper } from "../mapper/ResultGeneratoinMapper";
import { StudentService } from "../services/StudentService";
import  Subject_model  from "../models/SubjectModel";
import { Sequelize } from "sequelize";
import Students_model from "../models/StudentsModel";
import StudentSubject_model from "../models/StudentSubjectsModel";

export class StudentController {

  async getStudents(req: Request, res: Response): Promise<void> {
    const context = await Connect(); 
    try {

      

      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 5;
      const searchParam = (req.query.code as string) || "";
      

      var service = new GenericService(context);

      var result: any = await service.getAll(page, pageSize, searchParam)
      
      
      res.send(result);
    } catch (err) {
      console.log(err.message);
      res.send({  err });
    }
  }

  async getStudentsById(req: Request, res: Response): Promise<void> {
    const context = await Connect();
    try {

     

      const id_holder = parseInt(req.params.id);

      var service = new StudentService(context);

      var result: any = await service.get(id_holder);
      // const studentDetails : any = await StudentDetailsGeneration_model.findAll({
      //   where: {          ***** DATABASE FUNCTION IMPLEMENTATION BATA*****
      //     id_holder: id_holder,
      //   },
      // });

      var mapper = new StudentMapper();
      var dtos = await mapper.ModelToDto(result);
      
      res.status(200).json(dtos);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async addStudentMarks(req: Request, res: Response): Promise<void> {
    console.log(req.params);

    const studentid = parseInt(req.params.id);
    const sub_marks = JSON.stringify(req.body.sub_marks);
    const query = req.body.query;

    const context = await Connect();

    try {
      
      var service = new StudentService(context);

      var result: any = await service.mark(studentid,query, sub_marks);

      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  async generateResult(req: Request, res: Response): Promise<void> {
   
    const id = parseInt(req.params.id);
    const query = req.body.query;
    
    const context = await Connect();
    try {
      

      

      var service = await new StudentService(context);

      var result: any = await service.stud_res(id,query );
      console.log(result);
      var mapper = new ResultGenerationMapper();
      var dtos = await mapper.ModelToDto(result);

      res.status(200).send(dtos);
    } catch (err) {
      console.log(err.message);
      console.log(err);
      res.status(404).json(err.message);
    }
  }
}

//GETSTUDENTSBYID***************** ( alternate portion)

//   try {
//     const id_holder = parseInt(req.params.id);

//     const student: any = await Students_model.findOne({
//       where: { id: id_holder },
//       include: [{ model: Subject_model, through: { attributes: ['marks'] } }]

//     });

//       const name = student.firstname + (student.middlename ? ` ${student.middlename}` : '') + ` ${student.lastname}`;

//       const studentSubjects = student.subjects;
//     // console.log(studentSubjects)
//       const subjects = [];

//       studentSubjects.forEach((subject) => {
//         const obj = {
//         id: subject.id,
//         code: subject.code,
//         marks: subject.student_subjects.marks,
//       }

//       subjects.push(obj);
//     });

//       const responseBody = {
//         id: student.id,
//         name,
//         address: student.address,
//         subjects,
//       };

//       res.status(200).json(responseBody);
//   } catch (error) {
//     console.error(error);
//     res.status(404).json({ message: "Student not found." });
//   }
// }

//ADD MARKS KO PORTION **************** ( alternate portion)

//const data = req.body;

// const subjects = body.map((data) => data.subjectID);

// const json_data = JSON.stringify({"marks":89});
// try {

//   var result = data.map(async (d) => {
//       const json_data = JSON.stringify(d);
//       seq.query(`SELECT * FROM ad_student_marks(1, '${json_data}')`).then((res) => res[0][0]['ad_student_marks']);
//       // await result.push(ans[0][0]['ad_student_marks']);

//       // console.log(r);

//   })
// res.send(result);

// } catch(err) {
//   console.log(err);
//   res.end();
// }
