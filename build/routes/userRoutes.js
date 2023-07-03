"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const LoginController_1 = require("../controllers/LoginController");
//import { addStudentMarks, getStudentsById, generateResult } from '../controllers/StudentController';
const StudentController_1 = require("../controllers/StudentController");
const router = express.Router();
const stud_control = new StudentController_1.StudentController();
router.post("/login", LoginController_1.login);
router.get("/students", stud_control.getStudents); //not
router.get("/student/:id", stud_control.getStudentsById);
router.put("/students/:id", stud_control.addStudentMarks);
router.post("/students/:id/results", stud_control.generateResult);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map