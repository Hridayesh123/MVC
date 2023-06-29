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
exports.SubjectController = void 0;
const Connect_1 = require("../common/Connect");
const SubjectService_1 = require("../services/SubjectService");
const GenericService_1 = require("../services/GenericService");
const SubjectMapper_1 = require("../mapper/SubjectMapper");
class SubjectController {
    getSubject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const context = yield (0, Connect_1.Connect)();
                const page = parseInt(req.query.page) || 1;
                const pageSize = parseInt(req.query.pageSize) || 5;
                const searchParam = req.query.code || "";
                var service = new GenericService_1.GenericService(context);
                var result = yield service.getAll(page, pageSize, searchParam);
                var mapper = new SubjectMapper_1.SubjectMapper();
                var dtos = mapper.ModelToDto(result);
                res.send(dtos);
            }
            catch (err) {
                console.log(err.message);
                res.send({ err });
            }
        });
    }
    getSubjectsById(req, res) {
        try {
            const context = (0, Connect_1.Connect)();
            const id = parseInt(req.params.id);
            var service = new SubjectService_1.SubjectService(context);
            var result = service.byID(id);
            res.send(result);
        }
        catch (err) {
            console.log(err.message);
            res.send(err);
        }
    }
    createSubject(req, res) {
        try {
            const context = (0, Connect_1.Connect)();
            const name = req.body.name;
            const code = req.body.code;
            var service = new SubjectService_1.SubjectService(context);
            var result = service.create(name, code);
            res.send(result);
        }
        catch (err) {
            console.log(err.message);
            res.send(err);
        }
    }
    updateSubject(req, res) {
        try {
            const context = (0, Connect_1.Connect)();
            const id = parseInt(req.params.id);
            const name = req.body.name;
            const code = req.body.code;
            var service = new SubjectService_1.SubjectService(context);
            var result = service.update(id, name, code);
            res.send(result);
        }
        catch (err) {
            console.log(err.message);
            res.send(err);
        }
    }
    deleteSubject(req, res) {
        try {
            const context = (0, Connect_1.Connect)();
            const id = parseInt(req.params.id);
            var service = new SubjectService_1.SubjectService(context);
            var result = service.delete(id);
        }
        catch (err) {
            console.log(err.message);
            res.send(err);
        }
    }
}
exports.SubjectController = SubjectController;
//# sourceMappingURL=SubjectController.js.map