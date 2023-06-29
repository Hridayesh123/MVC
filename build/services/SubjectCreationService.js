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
exports.SubjectCreationService = void 0;
class SubjectCreationService {
    constructor(context) {
        this.dbContext = context;
    }
    create(name, code) {
        return __awaiter(this, void 0, void 0, function* () {
            var creation = yield this.dbContext.query(`INSERT INTO subjects(name, code) VALUES($1, $2)`, [name, code]);
            return "inserted / created";
        });
    }
}
exports.SubjectCreationService = SubjectCreationService;
//# sourceMappingURL=SubjectCreationService.js.map