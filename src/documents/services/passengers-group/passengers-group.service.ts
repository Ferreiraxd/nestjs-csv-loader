import { BookingGatewayClient } from 'src/infraestructure/microservice-clients/booking-client';

import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as xlsx from 'xlsx';
import { WorkBook, WorkSheet } from 'xlsx';
import * as path from 'path';
import { promisify } from 'util';

@Injectable()
export class PassengersGroupService {

    constructor(private readonly bookingGateway: BookingGatewayClient){}

    async readFile(destination: string, fullname: string): Promise<any>{
        let unlinkAsync = promisify(fs.unlink);
        console.log(path.join(__dirname,`/${fullname}`));

        const wb: WorkBook = await new Promise((resolve,reject) => {
            const stream: fs.ReadStream = fs.createReadStream(`${destination}/${fullname}`);

            const buffers = [];
            
            stream.on('data', (data) => { return buffers.push(data)});

            stream.on('end', () => {
                const buffer = Buffer.concat(buffers);
                resolve(xlsx.read(buffer, { type: 'buffer' }));
              });
      
              stream.on('error', (error) => reject(error));
        });

        const sheet: WorkSheet = wb.Sheets[wb.SheetNames[0]];

        const sheetToJson = xlsx.utils.sheet_to_json(sheet);
        
        console.log(sheetToJson);

        const range = xlsx.utils.decode_range(sheet['!ref']);

        var ncols = range.e.c - range.s.c + 1, nrows = range.e.r - range.s.r + 1;

        console.log(ncols, nrows);
        
        const passengers = [];

        for (let R = range.s.r; R <= range.e.r; ++R){
            if (R === 0 || !sheet[xlsx.utils.encode_cell({ c: 0, r: R })]) {
                continue;
            }

            let col = 0;

            const entity = {
                usuario: sheet[xlsx.utils.encode_cell({c: col++, r: R})].v,
                password: sheet[xlsx.utils.encode_cell({c: col++, r: R})].v,
                ruc: sheet[xlsx.utils.encode_cell({c: col++, r: R})].v
            }

            passengers.push(entity);
        }

        await unlinkAsync(`${destination}/${fullname}`);

        sheetToJson.map(async (passenger, index) => {
            console.log(await this.bookingGateway.setPassengersDataIntoReservation(index, passenger));
        }) 

        return 'success';
    }


    async readFileBase64(body: any){
        
        const wb: WorkBook = await new Promise((resolve, reject) => {
            const workbook = xlsx.read(body.fileContent, {type: "base64"});
            if(workbook){
                resolve(workbook)
            }else{
                reject('invalid document');
            }
        });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const sheetToJson = xlsx.utils.sheet_to_json(sheet);
        
        console.log(sheetToJson);
        sheetToJson.map(async (passenger, index) => {
            console.log(await this.bookingGateway.setPassengersDataIntoReservation(index, passenger));
        }) 

        
        return 'success';
        //return sheetToJson;
    }
}
