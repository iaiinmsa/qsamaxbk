/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { Plan_typeController } from './plan_type.controller';
import { Plan_typeService } from './plan_type.service';

@Module({
    imports: [ PrismaModule],
    controllers: [ Plan_typeController],
    providers: [ Plan_typeService],
})
export class Plan_typeModule {}
