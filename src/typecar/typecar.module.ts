/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypecarController } from './typecar.controller';
import { TypecarService } from './typecar.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [ PrismaModule],
    controllers: [ TypecarController ],
    providers: [ TypecarService],
})
export class TypecarModule {}
