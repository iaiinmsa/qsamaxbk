import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TransportOperatorService } from './transport-operator.service';

import { ApiTags } from '@nestjs/swagger';
import { CreateTransportOperatorDto } from './dto/create-transport-operator.dto';
import { UpdateTransportOperatorDto } from './dto/update-transport-operator.dto';

@ApiTags('Transport Operator')
@Controller('transport-operator')
export class TransportOperatorController {
  constructor(private readonly service: TransportOperatorService) {}

  @Post()
  create(@Body() dto: CreateTransportOperatorDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTransportOperatorDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
