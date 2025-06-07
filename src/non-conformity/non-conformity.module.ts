import { Module } from '@nestjs/common';
import { NonConformityService } from './non-conformity.service';
import { NonConformityController } from './non-conformity.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Adjust path if your PrismaModule is elsewhere

@Module({
  imports: [PrismaModule], // Import PrismaModule to make PrismaService available
  controllers: [NonConformityController],
  providers: [NonConformityService],
})
export class NonConformityModule {}