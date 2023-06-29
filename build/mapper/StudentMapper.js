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
exports.StudentMapper = void 0;
class StudentMapper {
    ModelToDto(model) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = model.firstname + (model.middlename ? ` ${model.middlename}` : '') + ` ${model.lastname}`;
            const studentSubjects = model.subjects;
            // console.log(studentSubjects)
            const subjects = [];
            studentSubjects.forEach((subject) => {
                const obj = {
                    id: subject.id,
                    code: subject.code,
                    marks: subject.student_subjects.marks,
                };
                subjects.push(obj);
            });
            const responseBody = {
                id: model.id,
                name,
                address: model.address,
                subjects,
            };
            return responseBody;
        });
    }
}
exports.StudentMapper = StudentMapper;
//# sourceMappingURL=StudentMapper.js.map