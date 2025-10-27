/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Plan_headerController } from './plan_header.controller';
import { Plan_headerService } from './plan_header.service';

@Module({
    imports: [ PrismaModule],
    controllers: [ Plan_headerController],
    providers: [Plan_headerService],
})
export class Plan_headerModule { }
