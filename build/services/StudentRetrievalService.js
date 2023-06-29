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
exports.StudentRetrievalService = void 0;
class StudentRetrievalService {
    constructor(con) {
        // var context = require("../models/StudentsModel").Students(con);
        this.dbContext = con;
    }
    get(id_holder) {
        return __awaiter(this, void 0, void 0, function* () {
            var studentDetails = yield this.dbContext.query(`SELECT id, name, address, subject_id, subject_code, marks
                FROM stud_by_id(:id_holder)`, {
                replacements: { id_holder: id_holder },
            });
            return studentDetails;
            // console.log(error);
            // console.log(studentDetails)
            // const name = studentDetails[0].firstname + (studentDetails[0].middlename ? ` ${studentDetails[0].middlename}` : '') + ` ${studentDetails[0].lastname}`;
        });
    }
}
exports.StudentRetrievalService = StudentRetrievalService;
//# sourceMappingURL=StudentRetrievalService.js.map