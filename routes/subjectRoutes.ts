import * as express from "express";
import {verifyToken} from "../controllers/LoginController";
//import { createSubject, deleteSubject, getSubject, getSubjectsById, updateSubject } from "../controllers/SubjectController";

import { SubjectController } from "../controllers/SubjectController";

var sub_control = new SubjectController();

const router = express.Router();

router.post("/verify", verifyToken);

router.get("/getAll", sub_control.getSubject);

router.get("/:id", sub_control.getSubjectsById);

router.post("/create", verifyToken, sub_control.createSubject);

router.put("/:id", verifyToken, sub_control.updateSubject);

router.delete("/:id", verifyToken, sub_control.deleteSubject);

router.get("/", (req, res) => {
  res.json("inside router");
});

export default router;
