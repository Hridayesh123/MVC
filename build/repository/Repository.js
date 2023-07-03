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
exports.Repository = void 0;
const SubjectModel_1 = require("../models/SubjectModel");
class Repository {
    constructor(context) {
        this.dbContext = context;
        console.log(this.dbContext);
    }
    get(id_holder) {
        return __awaiter(this, void 0, void 0, function* () {
            var result = yield this.dbContext.findOne({
                where: { id: id_holder },
                include: [{ model: SubjectModel_1.default, through: { attributes: ["marks"] } }],
            });
            return result;
        });
    }
    getAll(page, pageSize, searchParam) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = (page - 1) * pageSize;
            var result = yield this.dbContext.findAll({
                limit: pageSize,
                offset,
                order: [["id", "ASC"]],
            });
            return result;
        });
    }
    create(name, code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.dbContext.create({
                    name: name,
                    code: code,
                });
                return "inserted";
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    byID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var result = yield this.dbContext.findOne({
                where: { id: id },
                raw: true, //to retrieve plain JSON object , for further processing set false(seq model instance)
            });
            return result;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var result = yield this.dbContext.destroy({
                where: { id: id },
            });
            return result ? result : "deleted";
        });
    }
    update(id, name, code) {
        return __awaiter(this, void 0, void 0, function* () {
            var result = yield this.dbContext.update({ name: name, code: code }, { where: { id: id } });
            return "updated";
        });
    }
    // async stud_result(id): Promise<any>{
    //   const query =  `SELECT id, name, address, subject_id, subject_code, marks
    //   FROM stud_by_id(:id_holder)`;
    //   var result = await this.dbContext.query(query,{
    //     replacements :{
    //       id_holder: id
    //     }
    //   });
    //   return result;
    // }
    stud_result(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const replacements = {
                id_holder: id,
            };
            var result = yield this.dbContext.sequelize.query(query, {
                replacements: replacements,
            });
            return result;
        });
    }
    marking(studentid, query, sub_marks) {
        return __awaiter(this, void 0, void 0, function* () {
            const replacements = { studentid: studentid, sub_marks: sub_marks };
            yield this.dbContext.sequelize.query(query, {
                replacements: replacements,
            });
            return "marks updated";
        });
    }
}
exports.Repository = Repository;
//# sourceMappingURL=Repository.js.map