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
exports.StudentService = void 0;
const GenericService_1 = require("./GenericService");
const Repository_1 = require("../repository/Repository");
class StudentService extends GenericService_1.GenericService {
    constructor(context) {
        var con = require("../models/StudentsModel").Students(context);
        super(new Repository_1.Repository(con));
        this.dbContext = context;
    }
    getAll(page, pageSize, searchParam) {
        return __awaiter(this, void 0, void 0, function* () {
            var result = yield this.repository.getAll(page, pageSize, searchParam);
            return result;
        });
    }
    get(id_holder) {
        return __awaiter(this, void 0, void 0, function* () {
            var result = yield this.repository.get(id_holder);
            return result;
        });
    }
    mark(studentid, query, sub_marks) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var marking = yield this.repository.marking(studentid, query, sub_marks);
                return marking;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    stud_res(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentDetails = yield this.repository.stud_result(id, query);
            return studentDetails;
        });
    }
}
exports.StudentService = StudentService;
//# sourceMappingURL=StudentService.js.map