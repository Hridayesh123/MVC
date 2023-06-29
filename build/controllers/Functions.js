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
exports.addStudentMarks = exports.getStudentsById = exports.verifyToken = exports.login = exports.deleteSubject = exports.updateSubject = exports.createSubject = exports.getSubjectsById = exports.getSubject = void 0;
const jwt = require("jsonwebtoken");
const db_config_1 = require("../config/db_config");
const models_1 = require("../models/models");
var key = "";
function login(req, res) {
    var user = {
        firstname: req.body.firstname,
        password: req.body.password,
        key: req.body.key,
    };
    const sql = "SELECT * FROM users WHERE firstname = $1 AND password = $2 AND secret_key =$3";
    const values = [user.firstname, user.password, user.key];
    db_config_1.default.query(sql, values, (err, result) => {
        console.log("query result:", result);
        console.log("query error:", err);
        if (!err && result.rows.length !== 0) {
            const db_user = result.rows[0];
            key = result.rows[0].secret_key;
            try {
                jwt.sign({ user }, key, (err, token) => {
                    if (err) {
                        console.log(err.message);
                    }
                    else {
                        console.log("DBUSER#####################: ", db_user);
                        res.json({
                            token,
                        });
                    }
                });
            }
            catch (err) {
                console.log(err.message);
            }
        }
        else {
            res.send("user not validated");
            console.log(err.message);
            console.log(err);
        }
    });
}
exports.login = login;
function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    console.log(bearerHeader);
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        jwt.verify(token, key, (err, authData) => {
            if (err) {
                console.log(err);
                return res.status(401).json({ message: "Unauthorized" });
            }
            else {
                console.log(authData.user.firstname);
                const sqll = `SELECT * FROM users where firstname=$1`;
                const values = [authData.user.firstname];
                db_config_1.default.query(sqll, values, (err, result) => {
                    if (err) {
                        res.status(401).json({ message: "not verified", error: err });
                    }
                    else {
                        next();
                    }
                });
            }
        });
    }
    else {
        res.send({
            result: "invalid token",
        });
    }
}
exports.verifyToken = verifyToken;
function getStudentsById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id_holder = parseInt(req.params.id);
        // const studentDetails : any = await StudentDetails_model.findAll({
        //   where: {
        //     id_holder: id_holder,
        //   },
        // });
        try {
            const studentDetails = yield models_1.seq.query(`SELECT id, name, address, subject_id, subject_code, marks
      FROM stud_by_id(:id_holder)`, {
                replacements: { id_holder: id_holder },
            });
            // console.log(error);
            // console.log(studentDetails)
            // const name = studentDetails[0].firstname + (studentDetails[0].middlename ? ` ${studentDetails[0].middlename}` : '') + ` ${studentDetails[0].lastname}`;
            const subjects = studentDetails[1].rows.map((row) => ({
                id: row.subject_id,
                code: row.subject_code,
                marks: row.marks,
            }));
            const name = studentDetails[1].rows[0].name;
            const responseBody = {
                id: studentDetails[0].id,
                name,
                address: studentDetails[0].address,
                subjects,
            };
            res.status(200).json(responseBody);
        }
        catch (err) {
            res.status(404).json(err);
        }
    });
}
exports.getStudentsById = getStudentsById;
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
function addStudentMarks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const student_id = parseInt(req.params.studentID);
            const sub_marks = JSON.stringify(req.body);
            console.log(student_id);
            console.log(sub_marks);
            const result = yield models_1.seq.query(`SELECT * FROM ad_student_marks(:student_id, :sub_marks`, {
                replacements: { student_id: student_id, sub_marks: sub_marks }
            });
        }
        catch (err) {
            console.log(err);
            res.send(err);
        }
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
    });
}
exports.addStudentMarks = addStudentMarks;
function getSubject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 5;
            const searchParam = req.query.code || "";
            const offset = (page - 1) * pageSize;
            // const subjects = await Subject_model.findAll({
            //   limit: pageSize,
            //   offset,
            //   order: [["id", "ASC"]],
            // });
            // res.send(subjects);
            const allSubjects = yield models_1.seq.query("SELECT * FROM getALLSubjects(:searchParam, :page, :pageSize);", {
                replacements: {
                    searchParam: searchParam,
                    page: page,
                    pageSize: pageSize,
                },
            });
            res.send(allSubjects);
        }
        catch (err) {
            console.log(err.message);
            res.send({ error: err });
        }
    });
}
exports.getSubject = getSubject;
function getSubjectsById(req, res) {
    const id = parseInt(req.params.id);
    db_config_1.default.query(`SELECT * FROM subjects WHERE id=${id}`, (err, result) => {
        if (err) {
            console.log(err.message);
        }
        else {
            res.send(result.rows);
        }
    });
}
exports.getSubjectsById = getSubjectsById;
function createSubject(req, res) {
    const name = req.body.name;
    const code = req.body.code;
    db_config_1.default.query(`INSERT INTO subjects(name, code) VALUES($1, $2)`, [name, code], (err, result) => {
        if (err) {
            console.log(err.message);
        }
        else {
            res.send("successfully inserted");
        }
    });
}
exports.createSubject = createSubject;
function updateSubject(req, res) {
    const id = parseInt(req.params.id);
    const name = req.body.name;
    const code = req.body.code;
    db_config_1.default.query(`UPDATE subjects SET name = $1, code = $2 WHERE id = $3`, [name, code, id], (err, result) => {
        if (err) {
            console.log(err.message);
        }
        else {
            res.send("successfully updated");
        }
    });
}
exports.updateSubject = updateSubject;
function deleteSubject(req, res) {
    const id = parseInt(req.params.id);
    db_config_1.default.query(`DELETE FROM subjects WHERE id = $1`, [id], (err, result) => {
        if (err) {
            console.log(err.message);
        }
        else {
            res.send("successfully deleted");
        }
    });
}
exports.deleteSubject = deleteSubject;
//search code subject name bata
//get subject database function search
//# sourceMappingURL=Functions.js.map