import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { BookingGatewayClient } from 'src/infraestructure/microservice-clients/booking-client';
import { PassengersGroupController } from './controllers/passengers-group/passengers-group.controller';
import { PassengersGroupService } from './services/passengers-group/passengers-group.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './uploads/documents',
      })
    })
  ],
  controllers: [PassengersGroupController],
  providers: [PassengersGroupService, BookingGatewayClient]
})
export class DocumentsModule {}
