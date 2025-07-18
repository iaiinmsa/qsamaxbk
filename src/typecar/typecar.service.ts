import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTypecarDto } from './dto/create-typecar.dto';
import { UpdateTypecarDto } from './dto/update-typecar.dto';

@Injectable()
export class TypecarService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTypecarDto) {
    return this.prisma.typeCar.create({ data });
  }

  findAll() {
    return this.prisma.typeCar.findMany();
  }

  findOne(id: number) {
    return this.prisma.typeCar.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateTypecarDto) {
    return this.prisma.typeCar.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.typeCar.delete({ where: { id } });
  }
}
