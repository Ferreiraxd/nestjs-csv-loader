import { Module } from '@nestjs/common';
import { BookingGatewayClient } from './booking-client';

@Module({
    providers: [BookingGatewayClient],
    exports: [BookingGatewayClient]
})
export class MicroserviceClientsModule {
    
}
