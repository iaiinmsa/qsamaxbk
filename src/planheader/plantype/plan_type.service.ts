/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class Plan_typeService { 
 constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.plan_type.findMany();
  }


}
