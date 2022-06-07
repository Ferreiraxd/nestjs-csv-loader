import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsModule } from './documents/documents.module';
import { InfraestructureModule } from './infraestructure/infraestructure.module';

@Module({
  imports: [DocumentsModule, InfraestructureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
