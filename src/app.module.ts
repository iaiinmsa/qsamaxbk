import { VacationRequestModule } from './vacation_requests/vacation-request.module';
import { Plan_typeModule } from './planheader/plantype/plan_type.module';
import { Plan_typeController } from './planheader/plantype/plan_type.controller';
import { Plan_headerModule } from './planheader/plan_header.module';
import { Plan_headerController } from './planheader/plan_header.controller';
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
import { ManufacturingOrderModule } from './manufacturingorder/manufacturing-order.module';
import { ConfigModule } from '@nestjs/config';
import { ReportModule } from './report/Mercadeo/report.module';



@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true, // para que sea accesible en todos los módulos
    }),
    VacationRequestModule,
    Plan_typeModule,
    Plan_headerModule,
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
    RequeststockappModule,
    Plan_headerModule,
    VacationRequestModule,
    ManufacturingOrderModule ,
    ReportModule,

  ],
  //  controllers: [


  // roviders: [AppService],
})
export class AppModule { }
