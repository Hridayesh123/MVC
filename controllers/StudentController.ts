import { Connect, init_Sequelize } from "../common/Connect";
import { Request, Response, query } from "express";
import { GenericService } from "../services/GenericService";
import { StudentMapper } from "../mapper/StudentMapper";
import { ResultGenerationMapper } from "../mapper/ResultGeneratoinMapper";
import { StudentService } from "../services/StudentService";
import Subject_model from "../models/SubjectModel";
import { Sequelize } from "sequelize";
import Students_model from "../models/StudentsModel";
import StudentSubject_model from "../models/StudentSubjectsModel";
import { ParserService } from "../services/ParserService";
import { DBoperationService } from "../services/DBoperationService";
import * as multer from "multer";
import { FileFilterCallback } from "multer";
const upload = multer({ dest: "uploads/" });
import { associateStudentModel } from "../models/StudentsModel";
import { CSVoperationService } from "../services/CSVoperationService";
import * as fs from "fs";
import * as pm from "pm";

export class StudentController {
  async getStudents(req: Request, res: Response): Promise<void> {
    const context = await Connect();
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 5;
      // const searchParam = (req.query.code as string) || "";

      var service = new StudentService(context);

      var result: any = await service.getAll(page, pageSize);

      res.send(result);
    } catch (err) {
      console.log(err.message);
      res.send({ err });
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

    const context = await Connect();

    try {
      var service = new StudentService(context);

      var result: any = await service.mark(studentid, sub_marks);

      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  async generateResult(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    const context = await Connect();
    try {
      var service = await new StudentService(context);

      var result: any = await service.stud_res(id);
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

  async seedCSV(req: Request, res: Response): Promise<any> {
    const context = await Connect();

    try {
      //const file = req.file;
      const usableCSV = req.file.buffer;
      var service = await new ParserService();

      // var result: any = await service.seedCSV("C:/Users/pc/Documents/parser_file.csv");

      var result: any = await service.seedCSV(usableCSV);

      var serve = await new DBoperationService(context);

      var operated = await serve.operate(result);

      res.status(200).send(operated);
    } catch (err) {
      console.log(err);
    }
  }

  async exportCSV(req: Request, res: Response): Promise<any> {
    const id = parseInt(req.params.id);
    const context = await Connect();

    try {
      var service = await new StudentService(context);

      var result: any = await service.exportCSV(id);

      var serve = await new CSVoperationService(context);

      var operated = await serve.exports(result);
      res.setHeader("Content-Disposition", "attachment; filename=exports.csv");
      res.setHeader("Content-Type", "text/csv");

      // const readStream = fs.createReadStream('exported.csv');
      // readStream.pipe(res);   /******************use when no need encrypting***********/

      // const backToCSV = Buffer.from(operated, 'base64').toString('utf8');
      // console.log(backToCSV); /***********back to csv format *************/

      // fs.writeFileSync('output.csv', backToCSV, 'utf-8');

      res.send(operated);
    } catch (err) {
      console.log(err);
    }
  }

  async exportAll(req: Request, res: Response): Promise<any> {
   
    const context = await Connect();

    try {
      var service = await new StudentService(context);

      var result: any = await service.exportAll();
      var serve = await new CSVoperationService(context);
      var operated = await serve.exportEvery(result);
      

      
    } catch (err) {
      console.log(err);
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
