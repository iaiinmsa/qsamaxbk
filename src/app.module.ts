import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ObjectiveModule } from './objective/Objective.module';



@Module({
  imports: [PrismaModule, 
  ObjectiveModule
  ],
//  controllers: [AppController],
  // roviders: [AppService],
})
export class AppModule {}
