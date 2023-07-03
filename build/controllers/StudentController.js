"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const Connect_1 = require("../common/Connect");
const GenericService_1 = require("../services/GenericService");
const StudentMapper_1 = require("../mapper/StudentMapper");
const ResultGeneratoinMapper_1 = require("../mapper/ResultGeneratoinMapper");
const StudentService_1 = require("../services/StudentService");
class StudentController {
    getStudents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = yield (0, Connect_1.Connect)();
            try {
                const page = parseInt(req.query.page) || 1;
                const pageSize = parseInt(req.query.pageSize) || 5;
                const searchParam = req.query.code || "";
                var service = new GenericService_1.GenericService(context);
                var result = yield service.getAll(page, pageSize, searchParam);
                res.send(result);
            }
            catch (err) {
                console.log(err.message);
                res.send({ err });
            }
        });
    }
    getStudentsById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = yield (0, Connect_1.Connect)();
            try {
                const id_holder = parseInt(req.params.id);
                var service = new StudentService_1.StudentService(context);
                var result = yield service.get(id_holder);
                // const studentDetails : any = await StudentDetailsGeneration_model.findAll({
                //   where: {          ***** DATABASE FUNCTION IMPLEMENTATION BATA*****
                //     id_holder: id_holder,
                //   },
                // });
                var mapper = new StudentMapper_1.StudentMapper();
                var dtos = yield mapper.ModelToDto(result);
                res.status(200).json(dtos);
            }
            catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        });
    }
    addStudentMarks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            const studentid = parseInt(req.params.id);
            const sub_marks = JSON.stringify(req.body.sub_marks);
            const query = req.body.query;
            const context = yield (0, Connect_1.Connect)();
            try {
                var service = new StudentService_1.StudentService(context);
                var result = yield service.mark(studentid, query, sub_marks);
                res.status(200).send(result);
            }
            catch (error) {
                console.log(error);
                res.send(error);
            }
        });
    }
    generateResult(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const query = req.body.query;
            const context = yield (0, Connect_1.Connect)();
            try {
                var service = yield new StudentService_1.StudentService(context);
                var result = yield service.stud_res(id, query);
                console.log(result);
                var mapper = new ResultGeneratoinMapper_1.ResultGenerationMapper();
                var dtos = yield mapper.ModelToDto(result);
                res.status(200).send(dtos);
            }
            catch (err) {
                console.log(err.message);
                console.log(err);
                res.status(404).json(err.message);
            }
        });
    }
}
exports.StudentController = StudentController;
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
//# sourceMappingURL=StudentController.js.map