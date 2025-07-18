import {
    Controller, Get, Post, Body, Patch, Param, Delete,
  } from '@nestjs/common';
  import { TypecarService } from './typecar.service';
  import { CreateTypecarDto } from './dto/create-typecar.dto';
  import { UpdateTypecarDto } from './dto/update-typecar.dto';
  import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
  
  @ApiTags('typecar')
  @Controller('typecar')
  export class TypecarController {
    constructor(private readonly service: TypecarService) {}
  
    @Post()
    @ApiOperation({ summary: 'Crear tipo de vehículo' })
    @ApiResponse({ status: 201, description: 'Tipo de vehículo creado' })
    create(@Body() dto: CreateTypecarDto) {
      return this.service.create(dto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Listar todos los tipos' })
    findAll() {
      return this.service.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Obtener tipo por ID' })
    findOne(@Param('id') id: string) {
      return this.service.findOne(+id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar tipo por ID' })
    update(@Param('id') id: string, @Body() dto: UpdateTypecarDto) {
      return this.service.update(+id, dto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar tipo por ID' })
    remove(@Param('id') id: string) {
      return this.service.remove(+id);
    }
  }
  