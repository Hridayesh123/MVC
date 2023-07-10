import * as express from 'express';
import { login } from '../controllers/LoginController';
import { StudentController } from '../controllers/StudentController';
import  Subject_model  from "../models/SubjectModel";
import { Sequelize } from "sequelize";
import Students_model from "../models/StudentsModel";
import StudentSubject_model from "../models/StudentSubjectsModel";
import * as multer from 'multer';
const upload = multer({ });


const router = express.Router();

const stud_control = new StudentController();

router.post("/login", login);

router.get("/students", stud_control.getStudents) //not

router.get("/student/:id", stud_control.getStudentsById);

router.put("/students/:id", stud_control.addStudentMarks);

router.get("/students/:id/results",stud_control.generateResult);

router.get("/seedCSV",stud_control.seedCSV); 

router.post('/postCSV', upload.single('csvFile'),stud_control.seedCSV );


export default router;