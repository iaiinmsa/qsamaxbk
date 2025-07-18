import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
  } from '@nestjs/common';
  import { FuelConsumptionControlService } from './fuel-consumption-control.service';
  import { CreateFuelConsumptionControlDto } from './dto/create-fuel-consumption-control.dto';
  import { UpdateFuelConsumptionControlDto } from './dto/update-fuel-consumption-control.dto';
  import { ApiTags, ApiQuery } from '@nestjs/swagger';
  
  @ApiTags('Fuel Consumption Control')
  @Controller('fuel-consumption-control')
  export class FuelConsumptionControlController {
    constructor(private readonly service: FuelConsumptionControlService) {}
  
    @Post()
    create(@Body() dto: CreateFuelConsumptionControlDto) {
      return this.service.create(dto);
    }
  
    @Get()
    @ApiQuery({ name: 'startDate', required: false, type: String })
    @ApiQuery({ name: 'endDate', required: false, type: String })
    findAll(
      @Query('startDate') startDate?: string,
      @Query('endDate') endDate?: string,
    ) {
      return this.service.findAllFiltered(startDate, endDate);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.service.findOne(+id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateFuelConsumptionControlDto) {
      return this.service.update(+id, dto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.service.remove(+id);
    }
  }
  