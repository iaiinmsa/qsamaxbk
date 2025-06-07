import { Module } from '@nestjs/common';
import { ProductAttachmentsService } from './product-attachments.service';
import { ProductAttachmentsController } from './product-attachments.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductAttachmentsController],
  providers: [ProductAttachmentsService],
  exports: [ProductAttachmentsService], // Exportar el servicio si otros módulos necesitan usarlo
})
export class ProductAttachmentsModule {}