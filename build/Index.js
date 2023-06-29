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
const express = require("express");
const bodyParser = require("body-parser");
const subjectRoutes_1 = require("./routes/subjectRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const Connect_1 = require("./common/Connect");
const app = express();
const port = 3000;
(0, Connect_1.init_Sequelize)();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', userRoutes_1.default);
app.use('/subject', subjectRoutes_1.default);
const server = app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    // await seq.sync({alter: true});
    console.log(`Server is running on port ${port}`);
}));
exports.default = server;
//# sourceMappingURL=Index.js.map