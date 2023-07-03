import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import  Subject_model  from "../models/SubjectModel";
import { Sequelize } from "sequelize";
import Students_model from "../models/StudentsModel";
import StudentSubject_model from "../models/StudentSubjectsModel";
import DbClient from "../config/db_config";

var key = '';
function login(req: Request, res: Response): void {
    var user = {
      firstname: req.body.firstname,
      password: req.body.password,
      key: req.body.key,
    };
  
    const sql =
      "SELECT * FROM users WHERE firstname = $1 AND password = $2 AND secret_key =$3";
  
    const values = [user.firstname, user.password, user.key];
  
    DbClient.query(sql, values, (err, result) => {
      console.log("query result:", result);
      console.log("query error:", err);
  
      if (!err && result.rows.length !== 0) {
        const db_user = result.rows[0];
  
        key = result.rows[0].secret_key;
  
        try {
          jwt.sign({ user }, key, (err, token) => {
            if (err) {
              console.log(err.message);
            } else {
              console.log("DBUSER#####################: ", db_user);
  
              res.json({
                token,
              });
            }
          });
        } catch (err) {
          console.log(err.message);
        }
      } else {
        res.send("user not validated");
        console.log(err.message);
        console.log(err);
      }
    });
  }
  
  interface AuthenticatedRequest extends Request {
    token?: string;
  }
  function verifyToken(req: Request, res: Response, next: NextFunction): void {
    const bearerHeader = req.headers["authorization"];
    console.log(bearerHeader);
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const token = bearer[1];
  
      jwt.verify(token, key, (err, authData: any) => {
        if (err) {
          console.log(err);
          return res.status(401).json({ message: "Unauthorized" });
        } else {
          console.log(authData.user.firstname);
          const sqll = `SELECT * FROM users where firstname=$1`;
          const values = [authData.user.firstname];
          DbClient.query(sqll, values, (err, result) => {
            if (err) {
              res.status(401).json({ message: "not verified", error: err });
            } else {
              next();
            }
          });
        }
      });
    } else {
      res.send({
        result: "invalid token",
      });
    }
  }


  export { AuthenticatedRequest };
  export {login, verifyToken};