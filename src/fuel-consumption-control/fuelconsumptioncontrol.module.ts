/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { FuelConsumptionControlService } from './fuel-consumption-control.service';
import { FuelConsumptionControlController } from './fuel-consumption-control.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [ PrismaModule],
    controllers: [ FuelConsumptionControlController],
    providers: [ FuelConsumptionControlService],
})
export class FuelConsumptionControlModule {}
