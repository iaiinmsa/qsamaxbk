import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransportOperatorDto } from './dto/create-transport-operator.dto';
import { UpdateTransportOperatorDto } from './dto/update-transport-operator.dto';


@Injectable()
export class TransportOperatorService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTransportOperatorDto) {
    return this.prisma.transportOperator.create({ data });
  }

  findAll() {
    return this.prisma.transportOperator.findMany();
  }

  findOne(id: number) {
    return this.prisma.transportOperator.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateTransportOperatorDto) {
    return this.prisma.transportOperator.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.transportOperator.delete({ where: { id } });
  }
}
