import * as express from 'express';
import { login } from '../controllers/LoginController';
//import { addStudentMarks, getStudentsById, generateResult } from '../controllers/StudentController';
import { StudentController } from '../controllers/StudentController';

const router = express.Router();

const stud_control = new StudentController();

router.post("/login", login);

router.get("/students", stud_control.getStudents)

router.get("/student/:id", stud_control.getStudentsById);

router.put("/students/:id", stud_control.addStudentMarks);

router.get("/students/:id/results",stud_control.generateResult);

export default router;