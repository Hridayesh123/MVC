import * as csv from "csv-parser";
import * as fs from "fs";
import { Readable } from "stream";


export class ParserService{

  async seedCSV(buffer/*path*/){
    let result = await this.readCsv(buffer)
    
    console.log(result);
    return result;
    
 }

  async readCsv(buffer/*path*/): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let myMap: any = [];
      const stream = Readable.from(buffer);  // accessing directly

      //  fs.createReadStream(path)
      //    .pipe(csv())            **************** when working with file path , when directly parsing use buffer and not createReadStream**************************
      //   .on("data", (row: any) => {
      //     myMap.push(row);
      //   })

  stream.pipe(csv())
        .on("data", (row:any) => {
          myMap.push(row);
        })
        .on("end", () => {
          const jsonData = JSON.stringify(myMap); // Convert the array to JSON string
          // const jsonObject = JSON.parse(jsonData); // Convert the JSON string to JSON object
          resolve(jsonData);
        })
  
        .on("error", reject);
        
    });
    
  }



 

}
 
  //email le condition apply garne
  //jati ota temp table chaixa banaune


  //join use garnu parxa


  //csv export, 
  //students/:id/download , hit csv file ma convert
  //name , subject, marks, address

  //how to use b64 in csv file