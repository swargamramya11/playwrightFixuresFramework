import fs from 'fs'
import { parse } from 'csv-parse/sync'
import * as XLSX from 'xlsx';

export class DataProvider {

    static getTestDataFromJson(filePath: string) {
        const data: any = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        return data
    }

    static getDataFromCSV(filePath: string) {
        const data = parse(fs.readFileSync(filePath, 'utf8'), { columns: true, skip_empty_lines: true })
        return data
    }

    static getDataFromXLSX(filePath: string) {
       //Loaded excel file
       //file--> workbook---sheets--rows & columns

       const workbook=XLSX.readFile(filePath);
       const sheetNames=workbook.SheetNames[0];
       const worksheet=workbook.Sheets[sheetNames];
       
       //convert sheet into json
       const loginData:any=XLSX.utils.sheet_to_json(worksheet);
       console.log(loginData);
    }
}