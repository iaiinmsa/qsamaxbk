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



@Module({
  imports: [PrismaModule, 
  ObjectiveModule,
  NonConformityModule,
  DispositionModule, // <-- Add this
  ProductModule,     // <-- Add this
  AttachmentModule, 
  ProductAttachmentsModule,
  ],
//  controllers: [AppController],
  // roviders: [AppService],
})
export class AppModule {}
