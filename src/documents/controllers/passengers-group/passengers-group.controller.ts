import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PassengersGroupService } from 'src/documents/services/passengers-group/passengers-group.service';
import { promisify } from 'util';
import * as fs from 'fs';

@Controller('v1')
export class PassengersGroupController {

    constructor(private passengersService: PassengersGroupService){
    }

    @Post('passengers-upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/documents',
            filename: function (req, file, cb) {
                cb(null, file.originalname)
            }
        })
    }))
    async uploadDocument(@UploadedFile() file){
        const response = this.passengersService.readFile(file.destination, file.originalname);
        return response;
    }

    @Post('passengers-upload-base64')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/documents',
            filename: function (req, file, cb) {
                cb(null, file.originalname)
            }
        })
    }))
    async uploadDocumentBase64(@UploadedFile() file, @Body() body: any){
        const response = this.passengersService.readFileBase64(body);
        return response;
    }


}
