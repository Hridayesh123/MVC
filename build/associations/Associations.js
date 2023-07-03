"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SubjectModel_1 = require("../models/SubjectModel");
const StudentsModel_1 = require("../models/StudentsModel");
const StudentSubjectsModel_1 = require("../models/StudentSubjectsModel");
StudentsModel_1.default.belongsToMany(SubjectModel_1.default, {
    through: StudentSubjectsModel_1.default,
});
SubjectModel_1.default.belongsToMany(StudentsModel_1.default, {
    through: StudentSubjectsModel_1.default,
});
//# sourceMappingURL=Associations.js.map