import { FuelConsumptionControlModule } from './fuel-consumption-control/fuelconsumptioncontrol.module';
import { CarModule } from './car/car.module';
import { TypecarModule } from './typecar/typecar.module';
import { TransportOperatorModule } from './transport-operator/transportoperator.module';
import { RequeststockappController } from './openorange/requeststockapp.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ObjectiveModule } from './objective/Objective.module';
import { NonConformityModule } from './non-conformity/non-conformity.module';
import { DispositionModule } from './disposition/disposition.module';
import { ProductModule } from './product/product.module';
import { AttachmentModule } from './attachment/attachment.module';
import { ProductAttachmentsModule } from './product-attachments/product-attachments.module';
import { RequeststockappModule } from './openorange/requeststockapp.module';



@Module({
  imports: [
    FuelConsumptionControlModule,

    CarModule,
    TypecarModule,
    TransportOperatorModule, PrismaModule,
    ObjectiveModule,
    NonConformityModule,
    DispositionModule, // <-- Add this
    ProductModule,     // <-- Add this
    AttachmentModule,
    ProductAttachmentsModule,
    RequeststockappModule
  ],
  //  controllers: [
  // roviders: [AppService],
})
export class AppModule { }
