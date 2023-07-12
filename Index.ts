import * as express from 'express';
import * as bodyParser from 'body-parser';
import subjectRoutes from './routes/subjectRoutes';
import userRoutes from './routes/userRoutes';
import { Server } from 'http';
import * as jwt from 'jsonwebtoken';
import { init_Sequelize } from './common/Connect';
import { associateSubjectModel } from './models/SubjectModel';
import { associateStudentModel } from './models/StudentsModel';
import  Subject_model  from "./models/SubjectModel";
import { Sequelize } from "sequelize";
import Students_model from "./models/StudentsModel";
import StudentSubject_model from "./models/StudentSubjectsModel";


const app = express();

const port = 3000;
init_Sequelize();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', userRoutes);
app.use('/subject', subjectRoutes);

const server: Server = app.listen(port, async () => {
// await seq.sync({alter: true});
    console.log(`Server is running on port ${port}`);
});

export default server;