import {
    Controller, Get, Post, Body, Patch, Param, Delete,
  } from '@nestjs/common';
  import { CarService } from './car.service';
  import { CreateCarDto } from './dto/create-car.dto';
  import { UpdateCarDto } from './dto/update-car.dto';
  import { ApiTags, ApiOperation } from '@nestjs/swagger';
  
  @ApiTags('car')
  @Controller('car')
  export class CarController {
    constructor(private readonly carService: CarService) {}
  
    @Post()
    @ApiOperation({ summary: 'Crear nuevo vehículo' })
    create(@Body() dto: CreateCarDto) {
      return this.carService.create(dto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Listar todos los vehículos' })
    findAll() {
      return this.carService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Obtener vehículo por ID' })
    findOne(@Param('id') id: string) {
      return this.carService.findOne(+id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar vehículo por ID' })
    update(@Param('id') id: string, @Body() dto: UpdateCarDto) {
      return this.carService.update(+id, dto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar vehículo por ID' })
    remove(@Param('id') id: string) {
      return this.carService.remove(+id);
    }
  }
  