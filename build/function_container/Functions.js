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
exports.getProfile = exports.verifyToken = exports.login = exports.deleteSubject = exports.updateSubject = exports.createSubject = exports.getSubjectsById = exports.getSubject = void 0;
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
        console.log('query result:', result);
        console.log('query error:', err);
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
                        const token_insert = "INSERT INTO login (token,user_id) VALUES($1, $2)";
                        const t_values = [token, db_user.id];
                        db_config_1.default.query(token_insert, t_values, (err, result) => {
                            if (err) {
                                res.send(err);
                            }
                            // else {
                            //   console.log(result);
                            //   res.send({message: "Token saved to database."})
                            // }
                        });
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
function getProfile(req, res) {
    const user_id = res.locals.user.id;
    // console.log('Profile: ', res.locals.user);
    // res.end();
}
exports.getProfile = getProfile;
function getSubject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = 5;
            const offset = (page - 1) * pageSize;
            const subjects = yield models_1.Subject_model.findAll({
                limit: pageSize,
                offset,
                order: [['id', 'ASC']],
            });
            res.send(subjects);
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
//# sourceMappingURL=Functions.js.map