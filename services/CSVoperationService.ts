import { Repository } from "../repository/Repository";
import { GenericService } from "./GenericService";
import { createObjectCsvWriter } from "csv-writer";
import * as fs from "fs";
import * as path from 'path';
import * as os from 'os';

export class CSVoperationService<T> extends GenericService<T> {
  protected dbContext: any;

  constructor(context) {
    var con = require("../models/StudentsModel").default(context);
    super(new Repository(con));

    this.dbContext = context;
  }

  async exports(result) {
    console.log(result);
    const documentsPath = path.join(os.homedir(), 'Documents');
    const csvWriter = createObjectCsvWriter({
      path: path.join(documentsPath, 'exported.csv'),
      header: [
        { id: "firstname", title: "FIRSTNAME" },
        { id: "address", title: "Address" },

        { id: "code", title: "Cooooode" },
        { id: "name", title: "Name" },
        { id: "marks", title: "Marks" },
      ],
    });

    const data = result.map((item) => {
      return {
        firstname: item.firstname,
        address: item.address,

        code: item.code,
        name: item.name,
        marks: item.marks,
        
      };
    });

     await csvWriter.writeRecords(data);
     const csvFilePath = path.join(documentsPath, 'exported.csv');

     const csvData = fs.readFileSync(csvFilePath);
     const csvBase64 = Buffer.from(csvData).toString("base64");

    // const fs = require('fs');
    // const fileData = fs.readFileSync('exported.csv');

    //const decodedBase64String = Buffer.from(fileData, 'base64').toString();

    // const filename = decodedBase64String.match(/filename="(.*).csv/)[1];

    
    //  const base64Data = fileData.toString('base64');
    // const base64Data = Buffer.alloc(fileContent.length).from(fileContent).toString('base64');
    
    return csvBase64;
  }
}
