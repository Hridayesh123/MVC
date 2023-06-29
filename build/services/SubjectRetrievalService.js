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
exports.SubjectRetrievalService = void 0;
class SubjectRetrievalService {
    constructor(context) {
        this.dbContext = context;
    }
    getAll(page, pageSize, searchParam) {
        return __awaiter(this, void 0, void 0, function* () {
            // const subjects = await Subject_model.findAll({
            //   limit: pageSize,
            //   offset,
            //   order: [["id", "ASC"]],
            // });
            // res.send(subjects);
            const allSubjects = yield this.dbContext.query("SELECT * FROM getALLSubjects(:searchParam, :page, :pageSize);", {
                replacements: {
                    searchParam: searchParam,
                    page: page,
                    pageSize: pageSize,
                },
            });
            return allSubjects;
        });
    }
    byID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const byID = yield this.dbContext.query(`SELECT * FROM subjects WHERE id=${id}`);
            return byID;
        });
    }
}
exports.SubjectRetrievalService = SubjectRetrievalService;
//# sourceMappingURL=SubjectRetrievalService.js.map