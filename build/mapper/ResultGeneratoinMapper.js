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
exports.ResultGenerationMapper = void 0;
class ResultGenerationMapper {
    ModelToDto(model) {
        return __awaiter(this, void 0, void 0, function* () {
            const subjects = {};
            const name = model[1].rows[0].name;
            for (const row of model[1].rows) {
                subjects[row.subject_code] = row.marks;
            }
            const marksArray = [];
            for (const [subjectCode, marks] of Object.entries(subjects)) {
                const markObj = {};
                markObj.subjectCode = marks;
                marksArray.push(markObj);
            }
            const totalMarks = Object.values(subjects).reduce((total, marks) => total + marks, 0);
            const number_of_subjects = Object.values(subjects).length;
            const gpa = (totalMarks / number_of_subjects) * 100;
            const responseBody = {
                Id: model[0].id,
                Name: name,
                GPA: gpa,
                Marks: marksArray,
            };
            return responseBody;
        });
    }
}
exports.ResultGenerationMapper = ResultGenerationMapper;
//# sourceMappingURL=ResultGeneratoinMapper.js.map