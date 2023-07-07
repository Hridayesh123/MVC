import * as csv from "csv-parser";
import * as fs from "fs";


export class ParserService{

  async seedCSV(path){
    let result = await this.readCsv(path)
    
    console.log(result);
    return result;
    
 }

async  readCsv(path): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let myMap: any = [];
      fs.createReadStream(path)
        .pipe(csv())
  
        .on("data", (row: any) => {
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