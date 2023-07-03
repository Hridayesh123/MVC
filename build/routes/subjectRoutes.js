"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const LoginController_1 = require("../controllers/LoginController");
//import { createSubject, deleteSubject, getSubject, getSubjectsById, updateSubject } from "../controllers/SubjectController";
const SubjectController_1 = require("../controllers/SubjectController");
var sub_control = new SubjectController_1.SubjectController();
const router = express.Router();
router.post("/verify", LoginController_1.verifyToken);
router.get("/getAll", sub_control.getSubject); //
router.get("/:id", sub_control.getSubjectsById);
router.post("/create", sub_control.createSubject);
router.put("/:id", sub_control.updateSubject);
router.delete("/:id", sub_control.deleteSubject);
router.get("/", (req, res) => {
    res.json("inside router");
});
exports.default = router;
//# sourceMappingURL=subjectRoutes.js.map