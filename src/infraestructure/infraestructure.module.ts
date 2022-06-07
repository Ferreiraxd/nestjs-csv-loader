import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { MicroserviceClientsModule } from './microservice-clients/microservice-clients.module';

@Module({
  imports: [PersistenceModule, MicroserviceClientsModule]
})
export class InfraestructureModule {}
