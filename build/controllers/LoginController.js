"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.login = void 0;
const jwt = require("jsonwebtoken");
const db_config_1 = require("../config/db_config");
var key = '';
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
//# sourceMappingURL=LoginController.js.map