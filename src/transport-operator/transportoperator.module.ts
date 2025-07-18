/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TransportOperatorController } from './transport-operator.controller';
import { TransportOperatorService } from './transport-operator.service';

@Module({
    imports: [ PrismaModule],
    controllers: [ TransportOperatorController ],
    providers: [ TransportOperatorService],
})

export class TransportOperatorModule {}
