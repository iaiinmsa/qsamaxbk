/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
    imports: [PrismaModule],
    controllers: [ CarController],
    providers: [ CarService],
})
export class CarModule {}
