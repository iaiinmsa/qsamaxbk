/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RequeststockappService } from './requeststockapp.service';
import { RequeststockappController } from './requeststockapp.controller';

@Module({
    imports: [ PrismaModule],
    controllers: [ RequeststockappController ],
    providers: [ RequeststockappService],
})
export class RequeststockappModule { }
