/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VacationRequestController } from './vacation-request.controller';
import { VacationRequestService } from './vacation-request.service';

@Module({
    imports: [ PrismaModule],
    controllers: [VacationRequestController],
    providers: [VacationRequestService],
})
export class VacationRequestModule {}
