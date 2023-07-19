import { Repository } from "../repository/Repository";
import { GenericService } from "./GenericService";
import { createObjectCsvWriter } from "csv-writer";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

export class CSVoperationService<T> extends GenericService<T> {
  protected dbContext: any;

  constructor(context) {
    var con = require("../models/StudentsModel").default(context);
    super(new Repository(con));

    this.dbContext = context;
  }

  async exports(result) {
    console.log(result);
    const documentsPath = path.join(os.homedir(), "Documents");
    const csvWriter = createObjectCsvWriter({
      path: path.join(documentsPath, "exported.csv"),
      header: [
        { id: "firstname", title: "FIRSTNAME" },
        { id: "address", title: "Address" },

        { id: "code", title: "Cooooode" },
        { id: "name", title: "Name" },
        { id: "marks", title: "Marks" },
      ],
    });

    const data = result[0].map((item) => {
      return {
        firstname: item.firstname,
        address: item.address,
        code: item.code,
        name: item.name,
        marks: item.marks,
      };
    });

    await csvWriter.writeRecords(data);
    const csvFilePath = path.join(documentsPath, "exported.csv");

    const csvData = fs.readFileSync(csvFilePath);
    //const csvBase64 = Buffer.from(csvData).toString("base64"); // turn base64

    return csvData;
  }

  async exportEvery(result) {
    console.log(result);
    const documentsPath = path.join(os.homedir(), "Documents");
    const csvPath = path.join(documentsPath, "exported.csv");
    const items = result[0];
    const writeRecordsToCSV = async (data, header) => {
      const csvWriter = createObjectCsvWriter({
        path: csvPath,
        header,
        append: true,
      });
      await csvWriter.writeRecords(data);
    };

    let previousName = "";
    for (const item of items) {
      const { firstname, address, code, name, marks } = item;
      if (firstname !== previousName) {
        await writeRecordsToCSV(
          [{ firstname, address }],
          [
            { id: "firstname", title: "FIRSTNAME" },
            { id: "address", title: "Address" },
          ]
        );
      }
      await writeRecordsToCSV(
        [{ code, name, marks }],
        [
          { id: "code", title: "Code" },
          { id: "name", title: "Name" },
          { id: "marks", title: "Marks" },
        ]
      );
      previousName = firstname;
    }
  }
}
