/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ManufacturingOrderController } from './manufacturing-order.controller';
import { ManufacturingOrderService } from './manufacturing-order.service';

@Module({
    imports: [ PrismaModule],
    controllers: [ ManufacturingOrderController ],
    providers: [ ManufacturingOrderService ],
})
export class ManufacturingOrderModule { }
