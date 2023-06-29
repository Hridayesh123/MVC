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
exports.SubjectUpdateService = void 0;
class SubjectUpdateService {
    constructor(context) {
        this.dbContext = context;
    }
    update(id, name, code) {
        return __awaiter(this, void 0, void 0, function* () {
            var updating = yield this.dbContext.query(`UPDATE subjects SET name = $1, code = $2 WHERE id = $3`, [name, code, id]);
            return updating ? updating : "subject updated";
        });
    }
}
exports.SubjectUpdateService = SubjectUpdateService;
//# sourceMappingURL=SubjectUpdateService.js.map