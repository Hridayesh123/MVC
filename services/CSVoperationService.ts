import { Repository } from "../repository/Repository";
import { GenericService } from "./GenericService";
import { createObjectCsvWriter } from "csv-writer";
import * as fs from "fs";

export class CSVoperationService<T> extends GenericService<T> {
  protected dbContext: any;

  constructor(context) {
    var con = require("../models/StudentsModel").default(context);
    super(new Repository(con));

    this.dbContext = context;
  }

  async exports(result) {
    console.log(result);
    const csvWriter = createObjectCsvWriter({
      path: "exported_data.csv",
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

    const fs = require('fs');
    const fileContent = fs.readFileSync('exported_data.csv');
    const base64Data = fileContent.toString('base64');
    // const base64Data = Buffer.alloc(fileContent.length).from(fileContent).toString('base64');
    
    return base64Data;
  }
}
