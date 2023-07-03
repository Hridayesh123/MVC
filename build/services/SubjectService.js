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
exports.SubjectService = void 0;
const GenericService_1 = require("./GenericService");
const Repository_1 = require("../repository/Repository");
const construct = require("../models/SubjectModel");
class SubjectService extends GenericService_1.GenericService {
    constructor(context) {
        var con = construct.Subject(context);
        super(new Repository_1.Repository(con));
        this.dbContext = context;
    }
    create(name, code) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.create(name, code);
            return "created/ inserted";
        });
    }
    getAll(page, pageSize, searchParam) {
        return __awaiter(this, void 0, void 0, function* () {
            var result = yield this.repository.getAll(page, pageSize, searchParam);
            return result;
            //    const allSubjects = await this.dbContext.query(
            //      "SELECT * FROM getALLSubjects(:searchParam, :page, :pageSize);",
            //      {       
            //   **************DATABASE FUNCTION IMPLEMENTATION BATA AS OPPOSED TO SEQ FUNCTION************
            //        replacements: {
            //          searchParam: searchParam,
            //          page: page,
            //          pageSize: pageSize,
            //        },
            //      });
            //     return allSubjects;
        });
    }
    byID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const getByID = yield this.repository.byID(id);
            return getByID;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var deletion = yield this.repository.delete(id);
            return deletion ? deletion : "subject deleted";
        });
    }
    update(id, name, code) {
        return __awaiter(this, void 0, void 0, function* () {
            var updating = yield this.repository.update(id, name, code);
            return updating ? updating : "subject updated";
        });
    }
}
exports.SubjectService = SubjectService;
//# sourceMappingURL=SubjectService.js.map