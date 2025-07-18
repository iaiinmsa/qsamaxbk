import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCarDto) {
    return this.prisma.car.create({ data });
  }

  findAll() {
    return this.prisma.car.findMany({
      include: { typeCar: true },
    });
  }

  findOne(id: number) {
    return this.prisma.car.findUnique({
      where: { id },
      include: { typeCar: true },
    });
  }

  update(id: number, data: UpdateCarDto) {
    return this.prisma.car.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.car.delete({ where: { id } });
  }
}
