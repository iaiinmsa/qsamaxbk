import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Disposition } from '@prisma/client';
import { CreateDispositionDto } from './dto/create-disposition.dto';
import { UpdateDispositionDto } from './dto/update-disposition.dto';

@Injectable()
export class DispositionService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDispositionDto): Promise<Disposition> {
    return this.prisma.disposition.create({ data: dto });
  }

  async findAll(): Promise<Disposition[]> {
    return this.prisma.disposition.findMany();
  }

  async findOne(id: number): Promise<Disposition | null> {
    const disposition = await this.prisma.disposition.findUnique({
      where: { dispositionId: id },
    });
    if (!disposition) {
      throw new NotFoundException(`Disposition with ID ${id} not found`);
    }
    return disposition;
  }

  async update(id: number, dto: UpdateDispositionDto): Promise<Disposition> {
    await this.findOne(id); // Check if exists
    return this.prisma.disposition.update({
      where: { dispositionId: id },
      data: dto,
    });
  }

  async remove(id: number): Promise<Disposition> {
    await this.findOne(id); // Check if exists
    return this.prisma.disposition.delete({
      where: { dispositionId: id },
    });
  }
}