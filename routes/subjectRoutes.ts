import * as express from "express";
import {verifyToken} from "../controllers/LoginController";
//import { createSubject, deleteSubject, getSubject, getSubjectsById, updateSubject } from "../controllers/SubjectController";

import { SubjectController } from "../controllers/SubjectController";
import  Subject_model  from "../models/SubjectModel";
import { Sequelize } from "sequelize";
import Students_model from "../models/StudentsModel";
import StudentSubject_model from "../models/StudentSubjectsModel";

var sub_control = new SubjectController();

const router = express.Router();

router.post("/verify", verifyToken);

router.get("/", sub_control.getSubject);//

router.get("/:id", sub_control.getSubjectsById);

router.post("/create", sub_control.createSubject);

router.put("/:id", sub_control.updateSubject);

router.delete("/:id", sub_control.deleteSubject);

router.get("/", (req, res) => {
  res.json("inside router");
});

export default router;
