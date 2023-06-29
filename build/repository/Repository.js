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
    }
    get(id_holder) {
        return __awaiter(this, void 0, void 0, function* () {
            var result = yield this.dbContext.findOne({
                where: { id: id_holder },
                include: [{ model: SubjectModel_1.Subject_model, through: { attributes: ["marks"] } }],
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
}
exports.Repository = Repository;
//# sourceMappingURL=Repository.js.map