import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFuelConsumptionControlDto } from './dto/create-fuel-consumption-control.dto';
import { UpdateFuelConsumptionControlDto } from './dto/update-fuel-consumption-control.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class FuelConsumptionControlService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateFuelConsumptionControlDto) {
    return this.prisma.fuelConsumptionControl.create({ data });
  }

  findAll() {
    return this.prisma.fuelConsumptionControl.findMany();
  }


async findAllFiltered(startDate?: string, endDate?: string) {
  const where: any = {};

  if (startDate || endDate) {
    where.orderDate = {};
    if (startDate) where.orderDate.gte = new Date(startDate);
    if (endDate) where.orderDate.lte = new Date(endDate);
  }

  return this.prisma.fuelConsumptionControl.findMany({
    where,
    include: {
      car: true,
      transportOperator: true,
    },
  });
}


  findOne(id: number) {
    return this.prisma.fuelConsumptionControl.findUnique({ where: { idtravel: id } });
  }

  update(id: number, data: UpdateFuelConsumptionControlDto) {
    return this.prisma.fuelConsumptionControl.update({
      where: { idtravel: id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.fuelConsumptionControl.delete({ where: { idtravel: id } });
  }
}
